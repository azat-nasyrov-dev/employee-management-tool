import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeesApi } from '../../core/api/employees/employees.api';
import { Employee } from '../../core/api/employees/employees.models';
import { EmployeesListComponent } from '../components/employees-list.component';
import { EmployeeDialogComponent } from '../dialogs/employee-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    EmployeesListComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
})
export class EmployeesPageComponent {
  private readonly employeesApi = inject(EmployeesApi);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  public readonly employees = signal<Employee[]>([]);
  public readonly loading = signal(false);

  constructor() {
    this.loadEmployees();
  }

  public loadEmployees(): void {
    this.loading.set(true);

    this.employeesApi.findAllEmployees().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: employees => {
        this.employees.set(employees);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  public openCreateDialog(): void {
    const ref = this.dialog.open(EmployeeDialogComponent, { width: '600px' });

    ref.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      if (result) this.loadEmployees();
    });
  }

  public openEditDialog(employee: Employee): void {
    const ref = this.dialog.open(EmployeeDialogComponent, {
      width: '600px',
      data: employee,
    });

    ref.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      if (result) this.loadEmployees();
    });
  }

  public removeEmployee(employee: Employee): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Delete ${employee.firstName} ${employee.lastName}?` },
    });

    ref.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      if (!result) return;

      this.employeesApi.removeEmployeeById(employee._id).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.snackBar.open('Employee deleted', 'Close', { duration: 3000 });
        this.loadEmployees();
      });
    });
  }
}
