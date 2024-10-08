import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SliderMenuComponent } from '../slider-menu/slider-menu.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SliderMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
