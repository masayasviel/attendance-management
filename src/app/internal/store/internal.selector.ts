import { createFeatureSelector, createSelector } from '@ngrx/store';
import dayjs from 'dayjs';

import { InternalFeatureKey, type State } from './internal.reducer';

export const selectAppFeature = createFeatureSelector<State>(InternalFeatureKey);

export const selectRecords = createSelector(selectAppFeature, (state) => state?.records ?? []);

export const selectAbsenteeismCount = createSelector(selectAppFeature, (state) => state?.absenteeismCount ?? 0);

export const selectSumMilliseconds = createSelector(selectAppFeature, (state) => {
  const records = state?.records ?? [];
  const absenteeismCount = state?.absenteeismCount ?? 0;
  const diffs = records.map((v) => {
    const start = dayjs(v.start);
    const finish = v.finish ? dayjs(v.finish) : null;
    if (finish === null) {
      return 0;
    }
    return finish.subtract(v.adjustment.hour, 'hour').subtract(v.adjustment.minute, 'minute').diff(start);
  });
  const absenteeismCountToMillisecond = absenteeismCount * 8 * 60 * 60 * 1000;
  return diffs.reduce((acc, cur) => acc + cur, 0) - absenteeismCountToMillisecond;
});
