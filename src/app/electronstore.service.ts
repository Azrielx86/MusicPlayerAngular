import { Injectable } from '@angular/core';
import * as ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root',
})
export class ElectronStoreService {
  private store: ElectronStore | undefined;

  constructor() {
    if (window.require) {
      try {
        const storeClass = window.require('electron-store');
        this.store = new storeClass();
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron Store not loaded');
    }
  }

  get = (key: string): any => {
    return this.store?.get(key);
  };

  set = (key: string, value: any) => {
    this.store?.set(key, value);
  };
}
