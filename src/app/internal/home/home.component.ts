import { Component } from '@angular/core';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AttendanceTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user = '横井';
}
