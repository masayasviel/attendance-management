import { Pipe, type PipeTransform } from '@angular/core';
import type { Dayjs } from 'dayjs';

@Pipe({
  name: 'dayjsFormat',
  standalone: true,
})
export class DayjsFormatPipe implements PipeTransform {
  transform(value?: Dayjs | null): string {
    if (!value) {
      return '-';
    }
    return value.format('HH:mm');
  }
}
