import { Component, type OnDestroy, type OnInit, effect, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  readonly ABSENTEEISM_COUNT_MAX = 30;
  readonly ABSENTEEISM_COUNT_MIN = 0;

  sum = input.required<string>();
  absenteeismCount = input.required<number>();
  emitAttendanceAtWork = output<void>();
  emitLeavingWork = output<void>();
  emitReset = output<void>();
  emitAbsenteeismCount = output<number>();

  sumFormControl = new FormControl<string>('');
  absenteeismCountFormControl = new FormControl<number>(0, {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.min(this.ABSENTEEISM_COUNT_MIN),
      Validators.max(this.ABSENTEEISM_COUNT_MAX),
      Validators.pattern(/^[0-9]*$/),
    ],
  });

  constructor() {
    effect(() => {
      this.sumFormControl.setValue(this.sum());
      this.absenteeismCountFormControl.setValue(this.absenteeismCount(), { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.sumFormControl.disable();
    this.subscriptions.add(
      this.absenteeismCountFormControl.valueChanges
        .pipe(filter(() => this.absenteeismCountFormControl.valid))
        .subscribe((v) => {
          this.emitAbsenteeismCount.emit(v);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
