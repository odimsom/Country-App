import { Component, input } from '@angular/core';

@Component({
  selector: 'list-btn-options',
  imports: [],
  templateUrl: './list-btn-options.component.html',
})
export class ListBtnOptionsComponent {
  public _query = input.required();
}
