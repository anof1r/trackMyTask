import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPageComponent {

}
