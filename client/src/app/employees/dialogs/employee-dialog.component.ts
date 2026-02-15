import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../../core/api/employees/employees.models';
import { EmployeesApi } from '../../core/api/employees/employees.api';
import { TagsApi } from '../../core/api/tags/tags.api';
import { Tag } from '../../core/api/tags/tags.models';
import { EmployeeFormComponent } from '../components/employee-form.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    EmployeeFormComponent,
  ],
  templateUrl: './employee-dialog.component.html',
})
export class EmployeeDialogComponent {
  private readonly employeesApi = inject(EmployeesApi);
  private readonly tagsApi = inject(TagsApi);
  private readonly dialogRef = inject(MatDialogRef<EmployeeDialogComponent>);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  public readonly data = inject<Employee | null>(MAT_DIALOG_DATA, { optional: true });

  public loading = signal(false);
  public readonly tags = signal<Tag[]>([]);

  constructor() {
    this.tagsApi.findAllTags().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(tags => this.tags.set(tags));
  }

  public get isEditMode(): boolean {
    return !!this.data;
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public save(form: EmployeeFormComponent): void {
    if (!form.valid) return;

    this.loading.set(true);

    const request$ = this.isEditMode
      ? this.employeesApi.updateEmployeeById(this.data!._id, form.value)
      : this.employeesApi.createEmployee(form.value);

    request$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'Employee updated' : 'Employee created',
          'Close',
          { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: () => this.loading.set(false),
    });
  }
}
