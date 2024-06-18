import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { InternalFacade } from '../../store/internal.facade';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private internalFacade = inject(InternalFacade);

  /** 出勤 */
  onClickAttendanceAtWorkButton(): void {
    this.internalFacade.setAttendanceAtWork();
  }

  /** リセット */
  onClickResetButton(): void {
    this.internalFacade.reset();
  }
}
