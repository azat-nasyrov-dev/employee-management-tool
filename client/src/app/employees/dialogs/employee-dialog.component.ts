import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  template: `
    <h2 mat-dialog-title>
      {{ isEditMode ? 'Edit Employee' : 'Create Employee' }}
    </h2>

    <mat-dialog-content>
      <app-employee-form
        [employee]="data ?? null"
        [tags]="tags()"
        #formComp
      />
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cancel</button>

      <button
        mat-raised-button
        color="primary"
        (click)="save(formComp)"
        [disabled]="!formComp.valid || loading()"
      >
        {{ loading() ? 'Saving...' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
})
export class EmployeeDialogComponent {
  private readonly employeesApi = inject(EmployeesApi);
  private readonly tagsApi = inject(TagsApi);
  private readonly dialogRef = inject(MatDialogRef<EmployeeDialogComponent>);
  public readonly data = inject<Employee | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly snackBar = inject(MatSnackBar);


  public loading = signal(false);
  public readonly tags = signal<Tag[]>([]);

  constructor() {
    this.tagsApi.findAllTags().subscribe(tags => {
      this.tags.set(tags);
    });
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

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'Employee updated' : 'Employee created',
          'Close',
          { duration: 3000 },
        );

        this.dialogRef.close(true);
      },
      error: () => this.loading.set(false),
    });
  }
}
