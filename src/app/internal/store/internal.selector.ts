import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InternalFeatureKey, type State } from './internal.reducer';

export const selectAppFeature = createFeatureSelector<State>(InternalFeatureKey);

export const selectRecordsConvertToDate = createSelector(selectAppFeature, (state) => state.records);
