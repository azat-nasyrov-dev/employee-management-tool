import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Tag } from '../../core/api/tags/tags.models';

@Component({
  selector: 'app-tags-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
})
export class TagsListComponent {
  @Input({ required: true }) public tags: Tag[] = [];
  @Output() public edit = new EventEmitter<Tag>();
  @Output() public remove = new EventEmitter<Tag>();

  public columns: string[] = ['name', 'externalId', 'actions'];
}
