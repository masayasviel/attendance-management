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

const testData: RecordInterfaceForState[] = [
  {
    date: '2024/01/20',
    start: '2024-01-20T09:15:00+09:00',
    finish: '2024-01-20T17:30:00+09:00',
    adjustment: {
      hour: 8,
      minute: 0,
    },
  },
  {
    date: '2024/02/10',
    start: '2024-02-10T07:45:00+09:00',
    finish: '2024-02-10T15:45:00+09:00',
    adjustment: {
      hour: 8,
      minute: 0,
    },
  },
  {
    date: '2024/02/20',
    start: '2024-02-20T13:15:00+09:00',
    finish: '2024-02-20T17:00:00+09:00',
    adjustment: {
      hour: 8,
      minute: 0,
    },
  },
  {
    date: '2024/03/10',
    start: '2024-03-10T08:45:00+09:00',
    finish: '2024-03-10T16:30:00+09:00',
    adjustment: {
      hour: 8,
      minute: 30,
    },
  },
  {
    date: '2024/03/25',
    start: '2024-03-25T09:30:00+09:00',
    finish: '2024-03-25T17:00:00+09:00',
    adjustment: {
      hour: 8,
      minute: 0,
    },
  },
  {
    date: '2024/04/15',
    start: '2024-04-15T11:00:00+09:00',
    finish: '2024-04-15T19:00:00+09:00',
    adjustment: {
      hour: 8,
      minute: 0,
    },
  },
  {
    date: '2024/04/25',
    start: '2024-04-25T10:00:00+09:00',
    finish: '2024-04-25T18:00:00+09:00',
    adjustment: {
      hour: 3,
      minute: 0,
    },
  },
  {
    date: '2024/05/10',
    start: '2024-05-10T07:00:00+09:00',
    finish: '2024-05-10T15:30:00+09:00',
    adjustment: {
      hour: 0,
      minute: 45,
    },
  },
  {
    date: '2024/05/20',
    start: '2024-05-20T08:30:00+09:00',
    finish: '2024-05-20T16:45:00+09:00',
    adjustment: {
      hour: 2,
      minute: 15,
    },
  },
  {
    date: '2024/06/01',
    start: '2024-06-01T09:00:00+09:00',
    finish: '2024-06-01T17:00:00+09:00',
    adjustment: {
      hour: 1,
      minute: 30,
    },
  },
];

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
  // リセット
  on(InternalAction.reset, () => initialState),
  // テストデータの挿入
  on(InternalAction.assetMockData, (state) => {
    return {
      ...state,
      absenteeismCount: 2,
      records: testData,
    };
  }),
);

export const InternalFeatureKey = 'internal';
