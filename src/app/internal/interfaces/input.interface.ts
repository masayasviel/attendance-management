import type { Dayjs } from 'dayjs';

export interface DialogEditInputInterface {
  /** 日付 */
  date: string;
  /** 出勤時刻 */
  start: Dayjs;
  /** 退勤時刻 */
  finish: Dayjs | null;
  /** 調整(時間) */
  hour: number;
  /** 調整(分) */
  minute: number;
}
