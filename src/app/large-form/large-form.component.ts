import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StorageService } from '../services/storage/storage.service';
import { IndexedDBStorageService } from '../services/storage/index-db-storage.service';

@Component({
  selector: 'app-large-form',
  templateUrl: './large-form.component.html',
  providers: [{ provide: StorageService, useClass: IndexedDBStorageService }]
})
export class LargeFormComponent {
  group = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
  });

  constructor() {
  }

  submit(): void {
    this.group.reset();
  }

}
