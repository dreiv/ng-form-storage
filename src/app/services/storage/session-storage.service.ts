import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements StorageService {

  getItem<T>(key: string): Promise<T> | void {
    const item = sessionStorage.getItem(key);

    if (item) {
      return Promise.resolve(JSON.parse(item));
    }
  }

  setItem<T>(key: string, value: T): Promise<void> {
    const result = sessionStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve(result);
  }

  removeItem(key: string): Promise<void> {
    return Promise.resolve(sessionStorage.removeItem(key));
  }

}
