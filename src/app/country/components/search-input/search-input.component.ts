import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class CountrySearchInputComponent {
  public _placeHolder = input<string>('Search');
  public _newChangeDetection = output<string>();
  public _inputValue = signal<string>('');

  public _debounceEffect = effect((OnCleanup) => {
    const value = this._inputValue();
    const timeOut = setTimeout(() => {
      this._newChangeDetection.emit(value);
    }, 500);

    OnCleanup(() => {
      clearTimeout(timeOut);
    });
  });
}
