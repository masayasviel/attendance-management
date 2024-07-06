import { createAction, props } from '@ngrx/store';

import type { DialogEditInputInterface } from '../interfaces/input.interface';

/** リセット */
export const reset = createAction('[Internal Page] Reset');
/** 出勤 */
export const setAttendanceAtWork = createAction('[Internal Page] Set Attendance At Work');
/** 退勤 */
export const setLeavingWork = createAction('[Internal Page] Set Leaving Work');
/** 編集 */
export const updateAttendanceData = createAction(
  '[Internal Page] Update Attendance Data',
  props<DialogEditInputInterface>(),
);
/** 削除 */
export const deleteAttendanceData = createAction('[Internal Page] Delete Attendance Data', props<{ date: string }>());

/** テストデータ作成 */
export const assetMockData = createAction('[Test] Create Mock Data');
