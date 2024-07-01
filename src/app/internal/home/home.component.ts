import { AsyncPipe } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InternalFacade } from '../store/internal.facade';
import { AttendanceTableComponent } from './attendance-table/attendance-table.component';
import { MatDialog } from '@angular/material/dialog';
import { EditFormDialogComponent } from './edit-form-dialog/edit-form-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AttendanceTableComponent, MatCardModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private dialog = inject(MatDialog);
  private internalFacade = inject(InternalFacade);

  protected records$ = this.internalFacade.recordsConvertToDate$;

  ngOnInit(): void {
    this.internalFacade.assetTestData();
  }

  onClickRow(date: string): void {
    this.dialog.open(EditFormDialogComponent);
  }

  onClickDeleteButton(date: string): void {
    console.log(`on click delete button date = ${date}`);
  }
}
