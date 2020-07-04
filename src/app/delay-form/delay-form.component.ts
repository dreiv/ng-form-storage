import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-delay-form',
  templateUrl: './delay-form.component.html'
})
export class DelayFormComponent {
  group = new FormGroup({
    name: new FormControl(),
    email: new FormControl()
  });

  constructor() { }

  submit(): void {
    this.group.reset();
  }

}
