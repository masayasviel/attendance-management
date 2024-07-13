import { Component, type OnDestroy, type OnInit, effect, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  sum = input.required<string>();
  emitAttendanceAtWork = output<void>();
  emitLeavingWork = output<void>();
  emitReset = output<void>();

  sumFormControl = new FormControl<string>('');

  constructor() {
    effect(() => {
      this.sumFormControl.setValue(this.sum());
    });
  }

  ngOnInit(): void {
    this.sumFormControl.disable();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
