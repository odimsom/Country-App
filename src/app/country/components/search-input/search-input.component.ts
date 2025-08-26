import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class CountrySearchInputComponent {
  public _placeHolder = input<string>('Search');
  public _newChangeDetection = output<string>();
  public OnSearch = (event: string) => {
    this._newChangeDetection.emit(event);
  };
}
