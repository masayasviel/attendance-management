import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import dayjs, { type Dayjs } from 'dayjs';
import { type Observable, map } from 'rxjs';
import type { DialogEditInputInterface } from '../interfaces/input.interface';
import type { RecordInterface } from '../interfaces/record.interface';
import * as InternalActions from './internal.actions';
import type { RecordInterfaceForState } from './internal.reducer';
import { selectRecords } from './internal.selector';

@Injectable({
  providedIn: 'root',
})
export class InternalFacade {
  private store = inject(Store);

  recordsConvertToDate$: Observable<RecordInterface[]> = this.store.select(selectRecords).pipe(
    map((item) =>
      item.map((v) => {
        const start = dayjs(v.start);
        const finish = v.finish ? dayjs(v.finish) : null;
        return {
          date: v.date,
          start,
          finish,
          adjustment: { ...v.adjustment },
          workingHour: this.computeWorkingHour(start, finish),
          difference: this.computeDifference(start, finish, v.adjustment),
        };
      }),
    ),
  );

  signalRecords = this.store.selectSignal(selectRecords);

  reset(): void {
    this.store.dispatch(InternalActions.reset());
  }

  setAttendanceAtWork(): void {
    this.store.dispatch(InternalActions.setAttendanceAtWork());
  }

  updateAttendanceData(param: DialogEditInputInterface): void {
    this.store.dispatch(InternalActions.updateAttendanceData(param));
  }

  deleteAttendanceData(date: string): void {
    this.store.dispatch(InternalActions.deleteAttendanceData({ date }));
  }

  setLeavingWork(): void {
    this.store.dispatch(InternalActions.setLeavingWork());
  }

  assetTestData(): void {
    this.store.dispatch(InternalActions.assetMockData());
  }

  private computeWorkingHour(start: Dayjs, finish: Dayjs | null): string {
    if (finish == null) {
      return '-';
    }
    const zeroPaddingDiffHour = this.diffHourZeroPadding(finish, start);
    const zeroPaddingDiffMinute = this.diffMinuteZeroPadding(finish, start);
    return `${zeroPaddingDiffHour}:${zeroPaddingDiffMinute}`;
  }

  private computeDifference(
    start: Dayjs,
    finish: Dayjs | null,
    adjustment: RecordInterfaceForState['adjustment'],
  ): string {
    if (finish == null) {
      return '-';
    }
    const diff = finish.subtract(adjustment.hour, 'hour').subtract(adjustment.minute, 'minute');
    const diffMilliSecond = diff.diff(start);
    const zeroPaddingDiffHour = this.diffHourZeroPadding(diff, start, true);
    const zeroPaddingDiffMinute = this.diffMinuteZeroPadding(diff, start, true);
    const ope = diffMilliSecond > 0 ? '+' : '-';
    return `${ope}${zeroPaddingDiffHour}:${zeroPaddingDiffMinute}`;
  }

  private diffHourZeroPadding(a: Dayjs, b: Dayjs, isAbs = false): string {
    let res = a.diff(b, 'hour') % 24;
    if (isAbs) {
      res = Math.abs(res);
    }
    return res.toString().padStart(2, '0');
  }

  private diffMinuteZeroPadding(a: Dayjs, b: Dayjs, isAbs = false): string {
    let res = a.diff(b, 'minute') % 60;
    if (isAbs) {
      res = Math.abs(res);
    }
    return res.toString().padStart(2, '0');
  }
}
