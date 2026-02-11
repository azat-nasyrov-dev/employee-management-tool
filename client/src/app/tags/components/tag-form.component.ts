import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TagType } from '../../core/api/tags/tag-type.enum';
import { Tag } from '../../core/api/tags/tags.models';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="form">

      <mat-form-field appearance="outline">
        <mat-label>Type</mat-label>
        <mat-select formControlName="type">
          <mat-option [value]="TagType.POSITIVE">Positive</mat-option>
          <mat-option [value]="TagType.NEGATIVE">Negative</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>External ID</mat-label>
        <input matInput formControlName="externalId" />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Color</mat-label>
        <input matInput type="color" formControlName="color" />
      </mat-form-field>

    </form>
  `,
})
export class TagFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  @Input()
  public set tag(value: Tag | null) {
    if (!value) return;

    this.form.patchValue({
      type: value.type,
      name: value.name,
      externalId: value.externalId,
      color: value.color,
    });
  }

  public TagType = TagType;

  public form = this.formBuilder.nonNullable.group({
    type: this.formBuilder.nonNullable.control<TagType>(
      TagType.POSITIVE,
      { validators: [Validators.required] }
    ),
    name: this.formBuilder.nonNullable.control<string>(
      '',
      { validators: [Validators.required] }
    ),
    externalId: this.formBuilder.nonNullable.control<string>(
      '',
      { validators: [Validators.required] }
    ),
    color: this.formBuilder.nonNullable.control<string>(
      '#000000',
      { validators: [Validators.required] }
    ),
  });

  public get value() {
    return this.form.getRawValue();
  }

  public get valid() {
    return this.form.valid;
  }
}
