import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  aaa: number;
  bbb: number;
  ccc: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', position: 1, weight: 1.008, symbol: 'H', aaa: 10, bbb: 20, ccc: 30 },
  { name: 'Helium', position: 2, weight: 4.0026, symbol: 'He', aaa: 15, bbb: 25, ccc: 35 },
  { name: 'Lithium', position: 3, weight: 6.94, symbol: 'Li', aaa: 12, bbb: 22, ccc: 32 },
  { name: 'Beryllium', position: 4, weight: 9.0122, symbol: 'Be', aaa: 14, bbb: 24, ccc: 34 },
  { name: 'Boron', position: 5, weight: 10.81, symbol: 'B', aaa: 13, bbb: 23, ccc: 33 },
  { name: 'Carbon', position: 6, weight: 12.011, symbol: 'C', aaa: 18, bbb: 28, ccc: 38 },
  { name: 'Nitrogen', position: 7, weight: 14.007, symbol: 'N', aaa: 16, bbb: 26, ccc: 36 },
  { name: 'Oxygen', position: 8, weight: 15.999, symbol: 'O', aaa: 17, bbb: 27, ccc: 37 },
  { name: 'Fluorine', position: 9, weight: 18.998, symbol: 'F', aaa: 19, bbb: 29, ccc: 39 },
  { name: 'Neon', position: 10, weight: 20.18, symbol: 'Ne', aaa: 11, bbb: 21, ccc: 31 },
];

@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.scss',
})
export class AttendanceTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'aaa', 'bbb', 'ccc'];
  dataSource = ELEMENT_DATA;
}
