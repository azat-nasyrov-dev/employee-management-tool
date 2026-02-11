import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Tag } from '../../core/api/tags/tags.models';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  template: `
    <table mat-table [dataSource]="tags">

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let tag">
          <span
            class="color box"
            [style.background]="tag.color"
          ></span>
          {{ tag.name }}
        </td>
      </ng-container>

      <ng-container matColumnDef="externalId">
        <th mat-header-cell *matHeaderCellDef> External ID </th>
        <td mat-cell *matCellDef="let tag">
          {{ tag.externalId }}
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> </th>
        <td mat-cell *matCellDef="let tag">
          <button mat-button (click)="edit.emit(tag)">Edit</button>
          <button mat-button color="warn" (click)="remove.emit(tag)">
            Delete
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>
    </table>
  `,
  styles: [
    `
      .color-box {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 8px;
        border-radius: 3px;
      }
    `,
  ],
})
export class TagsListComponent {
  @Input({ required: true }) public tags: Tag[] = [];
  @Output() public edit = new EventEmitter<Tag>();
  @Output() public remove = new EventEmitter<Tag>();

  public columns: string[] = ['name', 'externalId', 'actions'];
}
