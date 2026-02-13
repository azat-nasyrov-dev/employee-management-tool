import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tag } from '../../core/api/tags/tags.models';
import { TagsApi } from '../../core/api/tags/tags.api';
import { TagFormComponent } from '../components/tag-form.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TagFormComponent,
  ],
  templateUrl: './tag-dialog.component.html',
})
export class TagDialogComponent {
  private readonly tagsApi = inject(TagsApi);
  private readonly dialogRef = inject(MatDialogRef<TagDialogComponent>);
  public readonly data = inject<Tag | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly snackBar = inject(MatSnackBar);

  public loading = false;

  public get isEditMode(): boolean {
    return !!this.data;
  }

  public close(): void {
    this.dialogRef.close(false);
  }

  public save(formComp: TagFormComponent): void {
    if (!formComp.valid) return;

    this.loading = true;

    const request$ = this.isEditMode
      ? this.tagsApi.updateTagById(this.data!._id, formComp.value)
      : this.tagsApi.createTag(formComp.value);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'Tag updated' : 'Tag created',
          'close',
          { duration: 3000 },
        );

        this.dialogRef.close(true);
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
