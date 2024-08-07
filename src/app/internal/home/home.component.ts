import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import type { DialogEditInputInterface } from '../interfaces/input.interface';
import type { RecordInterface } from '../interfaces/record.interface';
import { InternalFacade } from '../store/internal.facade';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';
import { EditFormDialogComponent } from './edit-form-dialog/edit-form-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AttendanceTableComponent, MatCardModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private internalFacade = inject(InternalFacade);

  protected records$ = this.internalFacade.recordsConvertToDate$;
  onClickRow(param: RecordInterface): void {
    const dialogSubscribe = this.dialog
      .open<EditFormDialogComponent, DialogEditInputInterface, DialogEditInputInterface>(EditFormDialogComponent, {
        height: '360px',
        width: '600px',
        disableClose: true,
        data: {
          date: param.date,
          start: param.start,
          finish: param.finish,
          hour: param.adjustment.hour,
          minute: param.adjustment.minute,
        },
      })
      .afterClosed()
      .pipe(filter((v): v is DialogEditInputInterface => v != null))
      .subscribe((v) => {
        this.internalFacade.updateAttendanceData(v);
        this.snackbar.open('更新しました', 'Done', { duration: 3000 });
        dialogSubscribe.unsubscribe();
      });
  }

  onClickDeleteButton(date: string): void {
    this.internalFacade.deleteAttendanceData(date);
    this.snackbar.open('削除しました', 'Done', { duration: 3000 });
  }
}
