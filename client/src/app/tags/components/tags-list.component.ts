import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Tag } from '../../core/api/tags/tags.models';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  template: `
    @if (!tags.length) {
      <div class="empty-state">
        No tags created yet.
      </div>
    } @else {

      <table
        mat-table
        [dataSource]="tags"
        class="mat-elevation-z2"
      >

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let tag">
          <span
            class="color-box"
            [style.background]="tag.color"
          ></span>
            {{ tag.name }}
          </td>
        </ng-container>

        <ng-container matColumnDef="externalId">
          <th mat-header-cell *matHeaderCellDef>
            External ID
          </th>
          <td mat-cell *matCellDef="let tag">
            {{ tag.externalId }}
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let tag">

            <button
              mat-icon-button
              (click)="edit.emit(tag)"
            >
              <mat-icon>edit</mat-icon>
            </button>

            <button
              mat-icon-button
              color="warn"
              (click)="remove.emit(tag)"
            >
              <mat-icon>delete</mat-icon>
            </button>

          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: columns;"
          class="row"
        ></tr>

      </table>
    }
  `,
  styles: [`
    .color-box {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 8px;
      border-radius: 3px;
    }

    .row:hover {
      background: rgba(0, 0, 0, 0.03);
      cursor: pointer;
    }

    .empty-state {
      padding: 32px;
      text-align: center;
      opacity: 0.6;
    }
  `],
})
export class TagsListComponent {
  @Input({ required: true }) public tags: Tag[] = [];
  @Output() public edit = new EventEmitter<Tag>();
  @Output() public remove = new EventEmitter<Tag>();

  public columns: string[] = ['name', 'externalId', 'actions'];
}
