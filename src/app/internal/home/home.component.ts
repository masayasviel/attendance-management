import { Component, inject } from '@angular/core';
import { InternalFacade } from '../store/internal.facade';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AttendanceTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private internalFacade = inject(InternalFacade);

  records$ = this.internalFacade.recordsConvertToDate$;
}
