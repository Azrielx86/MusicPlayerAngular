import { Injectable } from '@angular/core';
import { ipcMain, IpcRenderer } from 'electron';

@Injectable({ providedIn: 'root' })
export class IpcService {
  private ipc?: IpcRenderer;
  constructor() {
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Electron IPC was not loaded');
    }
  }

  public on(channel: string, listener: any) {
    if (!this.ipc) return;
    this.ipc.on(channel, listener);
  }

  public once(channel: string, listener: any) {
    if (!this.ipc) return;
    this.ipc.once(channel, listener);
  }

  public send(channel: string, listener: any) {
    if (!this.ipc) return;
    this.ipc.send(channel, listener);
  }

  public removeAllListeners(channel: string) {
    if (!this.ipc) return;
    this.ipc.removeAllListeners(channel);
  }
}
