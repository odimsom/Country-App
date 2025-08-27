import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import type { MoreInformation } from '../../../interfaces/more-information-interface';

@Component({
  selector: 'show-information',
  imports: [DecimalPipe],
  templateUrl: './show-information.component.html',
})
export class ShowInformationComponent {
  public _information = input.required<MoreInformation>();
}
