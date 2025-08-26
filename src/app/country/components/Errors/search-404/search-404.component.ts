import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'search-404',
  imports: [RouterLink],
  templateUrl: './search-404.component.html',
})
export class Search404Component {
  public _err = input.required<string | null | unknown>();
  focusSearchInput() {
    throw new Error('Method not implemented.');
  }
}
