import { Component, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, type ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import dayjs from 'dayjs';

import type { DialogEditInputInterface } from '../../interfaces/input.interface';

@Component({
  selector: 'app-edit-form-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-form-dialog.component.html',
  styleUrl: './edit-form-dialog.component.scss',
})
export class EditFormDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditFormDialogComponent>);
  readonly dialogData = inject<DialogEditInputInterface>(MAT_DIALOG_DATA);
  readonly HOUR = 23;
  readonly MINUTE = 59;

  startFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  finishFormControl = new FormControl<string | null>(null, {
    nonNullable: false,
  });

  deltaHourFormControl = new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(-this.HOUR), Validators.max(this.HOUR)],
  });

  deltaMinuteFormControl = new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(-this.MINUTE), Validators.max(this.MINUTE)],
  });

  formGroup = new FormGroup({
    start: this.startFormControl,
    finish: this.finishFormControl,
    deltaHour: this.deltaHourFormControl,
    deltaMinute: this.deltaMinuteFormControl,
  });

  ngOnInit(): void {
    this.startFormControl.setValue(this.dialogData.start.format('HH:mm'));
    const finish = this.dialogData.finish;
    this.finishFormControl.setValue(finish?.format('HH:mm') ?? null);
    this.deltaHourFormControl.setValue(this.dialogData.hour);
    this.deltaMinuteFormControl.setValue(this.dialogData.minute);
    // validator内でdialogDataを参照しているためカリー化して後からセット
    this.formGroup.setValidators(this.validateFormGroup());
  }

  onClickUpdateButton(): void {
    const formValue = this.formGroup.getRawValue();
    this.dialogRef.close({
      date: this.dialogData.date,
      start: dayjs(`${this.dialogData.date} ${formValue.start}`),
      finish: formValue.finish && dayjs(`${this.dialogData.date} ${formValue.finish}`),
      hour: formValue.deltaHour,
      minute: formValue.deltaMinute,
    });
  }

  onClickCloseButton(): void {
    this.dialogRef.close(null);
  }

  private validateFormGroup(): ValidatorFn {
    return (formGroup) => {
      const { start, finish } = formGroup.getRawValue();
      if (finish == null) {
        this.startFormControl.setErrors(null);
        this.finishFormControl.setErrors(null);
        return null;
      }
      const startDate = dayjs(`${this.dialogData.date} ${start}`);
      const finishDate = dayjs(`${this.dialogData.date} ${finish}`);
      if (finishDate.diff(startDate) < 0) {
        this.startFormControl.setErrors({ failedValue: true });
        this.finishFormControl.setErrors({ failedValue: true });
        return { failedValue: true };
      }
      this.startFormControl.setErrors(null);
      this.finishFormControl.setErrors(null);
      return null;
    };
  }
}
