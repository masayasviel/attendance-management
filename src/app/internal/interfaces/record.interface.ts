import type { Dayjs } from 'dayjs';

export interface RecordInterface {
  date: Dayjs;
  start: Dayjs;
  finish: Dayjs | null;
  adjustment: {
    ope: 'plus' | 'minus';
    hour: number;
    minute: number;
  };
}
