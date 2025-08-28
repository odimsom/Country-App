import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class CountrySearchInputComponent {
  public _placeHolder = input<string>('Search');
  public _newChangeDetection = output<string>();

  public _initialValue = input<string>();

  public _inputValue = linkedSignal<string>(() => this._initialValue() ?? '');

  public _debounceEffect = effect((OnCleanup) => {
    const value = this._inputValue();

    const timeOut = setTimeout(() => {
      console.log([value]);
      this._newChangeDetection.emit(value);
    }, 500);

    OnCleanup(() => {
      clearTimeout(timeOut);
    });
  });
}
