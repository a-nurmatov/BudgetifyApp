import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-confirmation',
  templateUrl: `./edit-confirmation.component.html`,
  styleUrls: ['./edit-confirm.component.scss'],
})
export class EditConfirmationComponent {
  faTimes = faTimes;
}
