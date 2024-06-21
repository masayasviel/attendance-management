import { createAction } from '@ngrx/store';

/** リセット */
export const reset = createAction('[Internal Page] Reset');
/** 出勤 */
export const setAttendanceAtWork = createAction('[Internal Page] Set Attendance At Work');

/** テストデータ作成 */
export const assetMockData = createAction('[Test] Create Mock Data');
