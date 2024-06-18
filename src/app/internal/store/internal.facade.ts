import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import dayjs from 'dayjs';
import { type Observable, map } from 'rxjs';
import type { RecordInterface } from '../interfaces/record.interface';
import * as InternalActions from './internal.actions';
import { selectRecordsConvertToDate } from './internal.selector';

@Injectable({
  providedIn: 'root',
})
export class InternalFacade {
  private store = inject(Store);

  recordsConvertToDate$: Observable<RecordInterface[]> = this.store.select(selectRecordsConvertToDate).pipe(
    map((item) =>
      item.map((item) => ({
        date: dayjs(item.date),
        start: dayjs(item.start),
        finish: item.finish ? dayjs(item.finish) : null,
        adjustment: { ...item.adjustment },
      })),
    ),
  );

  reset(): void {
    this.store.dispatch(InternalActions.reset());
  }

  setAttendanceAtWork(): void {
    this.store.dispatch(InternalActions.setAttendanceAtWork());
  }
}
