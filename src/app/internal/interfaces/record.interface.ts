import type { Dayjs } from 'dayjs';

export interface RecordInterface {
  /** 日付 */
  date: string;
  /** 出勤時刻 */
  start: Dayjs;
  /** 退勤時刻 */
  finish: Dayjs | null;
  /** 調整分 */
  adjustment: {
    /** 時 */
    hour: number;
    /** 分 */
    minute: number;
  };
  /** 勤務時間 */
  workingHour: string;
  /** 差分 */
  difference: string;
}
