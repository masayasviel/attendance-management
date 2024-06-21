import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import dayjs from 'dayjs';
import { type Observable, map } from 'rxjs';
import type { RecordInterface } from '../interfaces/record.interface';
import * as InternalActions from './internal.actions';
import { selectRecords } from './internal.selector';

@Injectable({
  providedIn: 'root',
})
export class InternalFacade {
  private store = inject(Store);

  recordsConvertToDate$: Observable<RecordInterface[]> = this.store.select(selectRecords).pipe(
    map((item) =>
      item.map((item) => ({
        date: item.date,
        start: dayjs(item.start),
        finish: item.finish ? dayjs(item.finish) : null,
        adjustment: { ...item.adjustment },
      })),
    ),
  );

  signalRecords = this.store.selectSignal(selectRecords);

  reset(): void {
    this.store.dispatch(InternalActions.reset());
  }

  setAttendanceAtWork(): void {
    this.store.dispatch(InternalActions.setAttendanceAtWork());
  }
}
