import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './app-footer.component.html',
})
export class AppFooterComponent {
  public nowDate: Date = new Date();
}
