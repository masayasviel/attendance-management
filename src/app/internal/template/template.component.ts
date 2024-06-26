import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import dayjs from 'dayjs';
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
    const message = this.isEnableAttendanceAtWorkGetAlertMessage();
    if (message) {
      this.snackbar.open(message, 'Done', { duration: 3000 });
      return;
    }
    this.internalFacade.setAttendanceAtWork();
  }

  /** リセット */
  reset(): void {
    this.internalFacade.reset();
  }

  /** 出勤できるか確認とできない場合はその理由 */
  private isEnableAttendanceAtWorkGetAlertMessage(): string | null {
    const signalRecord = this.internalFacade.signalRecords();
    if (signalRecord.length > 0 && !signalRecord.at(-1)?.finish) {
      return '未退勤のレコードがあります。';
    }
    if (signalRecord.length > 0 && signalRecord.at(-1)?.date === dayjs().format('YYYY/MM/DD')) {
      return '本日はすでに出勤記録があります。';
    }
    return null;
  }
}
