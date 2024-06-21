import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { InternalFacade } from '../store/internal.facade';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  private internalFacade = inject(InternalFacade);
  private snackbar = inject(MatSnackBar);

  /** 出勤 */
  attendanceAtWork(): void {
    const signalRecord = this.internalFacade.signalRecords();
    if (signalRecord.length > 0 && !signalRecord.at(-1)?.finish) {
      this.snackbar.open('未退勤のレコードがあります。', 'Done', {
        duration: 3000,
      });
      return;
    }
    this.internalFacade.setAttendanceAtWork();
  }

  /** リセット */
  reset(): void {
    this.internalFacade.reset();
  }
}
