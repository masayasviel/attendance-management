import { Component, type OnDestroy, type OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-form-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-form-dialog.component.html',
  styleUrl: './edit-form-dialog.component.scss',
})
export class EditFormDialogComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  startFormControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.email],
  });

  ngOnInit(): void {
    this.subscription.add(
      this.startFormControl.valueChanges.subscribe((value) => {
        console.log(value);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
