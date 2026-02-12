import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../core/api/employees/employees.models';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  template: `
    @if (!employees.length) {
      <div class="empty-state">
        No employees created yet.
      </div>
    } @else {

      @for (employee of employees; track employee._id) {
        <mat-card class="card mat-elevation-z2">

          <div class="card-header">
            <h2>
              {{ employee.firstName }} {{ employee.lastName }}
            </h2>

            <div class="actions">
              <button mat-icon-button color="primary" (click)="edit.emit(employee)">
                <mat-icon>edit</mat-icon>
              </button>

              <button mat-icon-button color="warn" (click)="remove.emit(employee)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>

          <div class="info-grid">

            <div class="info-block">
              <div class="label">Office</div>
              <div class="value">{{ employee.office }}</div>
            </div>

            <div class="info-block">
              <div class="label">Date of Birth</div>
              <div class="value">
                {{ employee.dateOfBirth | date:'mediumDate' }}
              </div>
            </div>

            <div class="info-block">
              <div class="label">Phone</div>
              <div class="value">{{ employee.phoneNumber }}</div>
            </div>

          </div>

          @if (employee.tags.length) {
            <div class="tags-section">
              <div class="label">Tags</div>

              <div class="tags">
                @for (tag of employee.tags; track tag._id) {
                  <mat-chip
                    class="tag-chip"
                    [style.background]="tag.color"
                  >
                    {{ tag.name }}
                  </mat-chip>
                }
              </div>
            </div>
          }

        </mat-card>
      }
    }
  `,
  styles: [`
    .card {
      padding: 24px;
      margin: 16px 0;
      border-radius: 16px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h2 {
      margin: 0;
      font-weight: 600;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }

    .info-block {
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 12px;
      text-transform: uppercase;
      opacity: 0.6;
      margin-bottom: 4px;
    }

    .value {
      font-size: 15px;
      font-weight: 500;
    }

    .tags-section {
      margin-top: 24px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .tag-chip {
      color: #fff;
      font-weight: 500;
    }

    .empty-state {
      padding: 48px;
      text-align: center;
      opacity: 0.6;
    }
  `]
})
export class EmployeesListComponent {
  @Input({ required: true }) public employees!: Employee[];
  @Output() public edit = new EventEmitter<Employee>();
  @Output() public remove = new EventEmitter<Employee>();
}
