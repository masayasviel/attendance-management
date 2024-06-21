import type { Dayjs } from 'dayjs';

export interface RecordInterface {
  date: string;
  start: Dayjs;
  finish: Dayjs | null;
  adjustment: {
    hour: number;
    minute: number;
  };
  workingHour: string;
  difference: string;
}
