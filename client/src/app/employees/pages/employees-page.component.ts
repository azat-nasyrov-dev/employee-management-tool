import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
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
    MatProgressSpinnerModule,
    EmployeesListComponent,
  ],
  template: `
    <div class="page">

      <div class="page-header">
        <h1>Employees Management</h1>

        <button
            mat-raised-button
            color="primary"
            (click)="openCreateDialog()"
        >
          Create Employee
        </button>
      </div>

      @if (loading()) {
        <div class="loading">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      }

      <app-employees-list
        [employees]="employees()"
        (edit)="openEditDialog($event)"
        (remove)="removeEmployee($event)"
      />
    </div>
  `,
  styles: [`
    .page {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .loading {
      display: flex;
      justify-content: center;
      margin: 32px 0;
    }
  `],
})
export class EmployeesPageComponent {
  private readonly employeesApi = inject(EmployeesApi);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  public readonly employees = signal<Employee[]>([]);
  public readonly loading = signal(false);

  constructor() {
    this.loadEmployees();
  }

  public loadEmployees(): void {
    this.loading.set(true);

    this.employeesApi.findAllEmployees().subscribe({
      next: employees => {
        this.employees.set(employees);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  public openCreateDialog(): void {
    const ref = this.dialog.open(EmployeeDialogComponent, {
      width: '600px',
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.loadEmployees();
    });
  }

  public openEditDialog(employee: Employee): void {
    const ref = this.dialog.open(EmployeeDialogComponent, {
      width: '600px',
      data: employee,
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.loadEmployees();
    });
  }

  public removeEmployee(employee: Employee): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Delete ${employee.firstName} ${employee.lastName}?` },
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;

      this.employeesApi.removeEmployeeById(employee._id).subscribe(() => {
        this.snackBar.open('Employee deleted', 'Close', { duration: 3000 });
        this.loadEmployees();
      });
    });
  }
}
