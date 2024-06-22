import { AsyncPipe } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InternalFacade } from '../store/internal.facade';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AttendanceTableComponent, MatCardModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private internalFacade = inject(InternalFacade);

  records$ = this.internalFacade.recordsConvertToDate$;

  ngOnInit(): void {
    this.internalFacade.assetTestData();
  }

  onClickRow(date: string): void {
    console.log(`on click row date = ${date}`);
  }

  onClickDeleteButton(date: string): void {
    console.log(`on click delete button date = ${date}`);
  }
}
