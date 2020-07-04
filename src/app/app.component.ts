import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  group = new FormGroup({
    name: new FormControl(),
    email: new FormControl()
  });

  constructor() {
  }

  submit(): void {
    this.group.reset();
  }
}
