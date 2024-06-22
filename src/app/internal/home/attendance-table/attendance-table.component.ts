import { Component, effect, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import type { RecordInterface } from '../../interfaces/record.interface';
import { DayjsFormatPipe } from '../../pipe/dayjs-format.pipe';

@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatIconModule, DayjsFormatPipe],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.scss',
})
export class AttendanceTableComponent {
  records = input.required<RecordInterface[]>();
  emitOnClickDelete = output<string>();
  emitOnClickRow = output<string>();
  protected readonly displayedColumns = [
    'date',
    'start',
    'finish',
    'workingHour',
    'adjustment',
    'difference',
    'delete',
  ];
  protected dataSource = new MatTableDataSource<RecordInterface>([]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.records();
    });
  }

  displayAdjustment(record: RecordInterface): string {
    const { adjustment } = record;
    const zeroPaddingAdjustmentHour = adjustment.hour.toString().padStart(2, '0');
    const zeroPaddingAdjustmentMinute = adjustment.minute.toString().padStart(2, '0');
    return `${zeroPaddingAdjustmentHour}:${zeroPaddingAdjustmentMinute}`;
  }

  onClickRow(record: RecordInterface) {
    this.emitOnClickRow.emit(record.date);
  }

  onClickDeleteButton($event: MouseEvent, record: RecordInterface) {
    $event.stopPropagation();
    this.emitOnClickDelete.emit(record.date);
  }
}
