import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TagsApi } from '../../core/api/tags/tags.api';
import { Tag } from '../../core/api/tags/tags.models';
import { TagType } from '../../core/api/tags/tag-type.enum';
import { TagsListComponent } from '../components/tags-list.component';
import { TagDialogComponent } from '../dialogs/tag-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    TagsListComponent,
  ],
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.scss'],
})
export class TagsPageComponent {
  private readonly tagsApi = inject(TagsApi);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  private readonly tags = signal<Tag[]>([]);
  public readonly positiveTags = signal<Tag[]>([]);
  public readonly negativeTags = signal<Tag[]>([]);
  public readonly loading = signal(false);

  constructor() {
    this.loadTags();

    effect(() => {
      const all = this.tags();

      this.positiveTags.set(
        all.filter(t => t.type === TagType.POSITIVE)
      );

      this.negativeTags.set(
        all.filter(t => t.type === TagType.NEGATIVE)
      );
    });
  }

  public loadTags(): void {
    this.loading.set(true);

    this.tagsApi.findAllTags().subscribe({
      next: tags => {
        this.tags.set(tags);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  public openCreateDialog(): void {
    const ref = this.dialog.open(TagDialogComponent, {
      width: '420px',
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.loadTags();
    })
  }

  public openEditDialog(tag: Tag): void {
    const ref = this.dialog.open(TagDialogComponent, {
      width: '420px',
      data: tag,
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.loadTags();
    });
  }

  public removeTag(tag: Tag): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Delete tag "${tag.name}"?` },
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;

      this.tagsApi.removeTagById(tag._id).subscribe(() => {
        this.snackBar.open('Tag deleted', 'Close', { duration: 3000 });
        this.loadTags();
      });
    });
  }
}
