import { Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { Employee } from '../../core/api/employees/employees.models';
import  {Office } from '../../core/api/shared/office.enum';
import { Tag } from '../../core/api/tags/tags.models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  public offices = Object.values(Office) as Office[];
  public availableTags: Tag[] = [];

  @Input()
  public set employee(value: Employee | null) {
    if (!value) return;

    this.form.patchValue({
      firstName: value.firstName,
      lastName: value.lastName,
      office: value.office,
      dateOfBirth: new Date(value.dateOfBirth),
      phoneNumber: value.phoneNumber,
      tags: value.tags.map(t => t._id),
    });
  }

  @Input()
  public set tags(value: Tag[]) {
    this.availableTags = value;
  }

  form = this.formBuilder.nonNullable.group({
    firstName: this.formBuilder.nonNullable.control<string>('', {
      validators: [Validators.required],
    }),
    lastName: this.formBuilder.nonNullable.control<string>('', {
      validators: [Validators.required],
    }),
    office: this.formBuilder.nonNullable.control<Office>(Office.TALLINN, {
      validators: [Validators.required],
    }),
    dateOfBirth: this.formBuilder.nonNullable.control<Date>(new Date(), {
      validators: [Validators.required],
    }),
    phoneNumber: this.formBuilder.nonNullable.control<string>('', {
      validators: [Validators.required],
    }),
    tags: this.formBuilder.nonNullable.control<string[]>([]),
  });

  public get value(): {
    firstName: string;
    lastName: string;
    office: Office;
    dateOfBirth: string;
    phoneNumber: string;
    tags: string[];
  } {
    const raw = this.form.getRawValue();

    return {
      firstName: raw.firstName,
      lastName: raw.lastName,
      office: raw.office,
      dateOfBirth: raw.dateOfBirth.toISOString().split('T')[0],
      phoneNumber: raw.phoneNumber,
      tags: raw.tags,
    };
  }

  public get valid() {
    return this.form.valid;
  }
}
