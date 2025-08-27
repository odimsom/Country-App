import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'search-404',
  imports: [RouterLink],
  templateUrl: './search-404.component.html',
})
export class Search404Component {
  public window = window;
  public _location = inject(Location);
  public _err = input.required<string | null | unknown>();

  public GoBack = (): void => {
    this._location.back();
  };
}
