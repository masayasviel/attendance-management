import { createAction } from '@ngrx/store';

/** リセット */
export const reset = createAction('[Internal Page] Reset');
/** 出勤 */
export const setAttendanceAtWork = createAction('[Internal Page] Set Attendance At Work');
