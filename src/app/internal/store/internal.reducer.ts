import { createReducer, on } from '@ngrx/store';
import dayjs from 'dayjs';
import * as InternalAction from './internal.actions';

interface RecordInterfaceForState {
  date: string;
  start: string;
  finish: string | null;
  adjustment: {
    ope: 'plus' | 'minus';
    hour: number;
    minute: number;
  };
}

export interface State {
  records: RecordInterfaceForState[];
}

export const initialState: State = {
  records: [],
};

export const InternalReducer = createReducer(
  initialState,
  // 出勤
  on(InternalAction.setAttendanceAtWork, (state) => {
    console.log(state);
    const newRecord: RecordInterfaceForState = {
      date: dayjs().format('YYYY/MM/DD'),
      start: dayjs().format(),
      finish: null,
      adjustment: {
        ope: 'plus',
        hour: 0,
        minute: 0,
      },
    };
    return {
      ...state,
      records: [...state.records, newRecord],
    };
  }),
  // リセット
  on(InternalAction.reset, (state) => initialState),
);

export const InternalFeatureKey = 'internal';
