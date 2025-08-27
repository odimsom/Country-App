import { Component, input } from '@angular/core';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'search-404',
  imports: [RouterLink],
  templateUrl: './search-404.component.html',
})
export class Search404Component {
  public window = window;
  public _err = input.required<string | null | unknown>();
}
