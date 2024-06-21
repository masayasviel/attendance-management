import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import dayjs, { type Dayjs } from 'dayjs';
import { type Observable, map } from 'rxjs';
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

  private computeWorkingHour(start: Dayjs, finish: Dayjs | null): string {
    if (finish == null) {
      return '-';
    }
    const diffHour = finish.diff(start, 'hour');
    const diffMinute = finish.diff(start, 'minute');
    return `${diffHour}:${diffMinute}`;
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
    return `${diffMilliSecond}`;
  }
}
