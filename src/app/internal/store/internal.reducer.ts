import { createReducer, on } from '@ngrx/store';
import dayjs from 'dayjs';

import * as InternalAction from './internal.actions';

export interface RecordInterfaceForState {
  /** 日付 */
  date: string;
  /** 出勤時刻 */
  start: string;
  /** 退勤時刻 */
  finish: string | null;
  /** 調整分 */
  adjustment: {
    /** 時 */
    hour: number;
    /** 分 */
    minute: number;
  };
}

export interface State {
  /** 欠勤数 */
  absenteeismCount: number;
  /** 勤怠記録 */
  records: RecordInterfaceForState[];
}

export const initialState: State = {
  absenteeismCount: 0,
  records: [],
};

export const InternalReducer = createReducer(
  initialState,
  // 出勤
  on(InternalAction.setAttendanceAtWork, (state) => {
    const currentState = state.records ?? [];
    const newRecord: RecordInterfaceForState = {
      date: dayjs().tz().format('YYYY/MM/DD'),
      start: dayjs().tz().format(),
      finish: null,
      adjustment: {
        hour: 0,
        minute: 0,
      },
    };
    return {
      ...state,
      records: [...currentState, newRecord],
    };
  }),
  on(InternalAction.setLeavingWork, (state) => {
    const target = (state.records ?? []).at(-1);
    if (!target) {
      return { ...state };
    }
    return {
      ...state,
      records: (state.records ?? []).map((record) => {
        if (record.date === target.date) {
          return {
            ...target,
            finish: dayjs().tz().format(),
            adjustment: {
              hour: 8,
              minute: 0,
            },
          };
        }
        return record;
      }),
    };
  }),
  // 更新
  on(InternalAction.updateAttendanceData, (state, param) => {
    const newRecords = (state.records ?? []).map((record) => {
      if (record.date === param.date) {
        return {
          date: param.date,
          start: param.start.format(),
          finish: param.finish?.format() ?? null,
          adjustment: {
            hour: param.hour,
            minute: param.minute,
          },
        };
      }
      return record;
    });
    return {
      ...state,
      records: newRecords,
    };
  }),
  // 削除
  on(InternalAction.deleteAttendanceData, (state, { date }) => ({
    ...state,
    records: (state.records ?? []).filter((record) => record.date !== date),
  })),
  // 欠勤数更新
  on(InternalAction.updateAbsenteeismCount, (state, { count }) => ({
    ...state,
    absenteeismCount: count,
  })),
  // リセット
  on(InternalAction.reset, () => initialState),
);

export const InternalFeatureKey = 'internal';
