import { Component, inject, input } from '@angular/core';
import { DecimalPipe, Location } from '@angular/common';

import type { MoreInformation } from '../../../interfaces/more-information-interface';

@Component({
  selector: 'show-information',
  imports: [DecimalPipe],
  templateUrl: './show-information.component.html',
})
export class ShowInformationComponent {
  public _information = input.required<MoreInformation>();
  public _location = inject(Location);

  public GoBack = (): void => {
    this._location.back();
  };
}
