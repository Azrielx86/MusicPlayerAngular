import { ChangeDetectorRef, Component } from '@angular/core';
import { AudioService } from './AudioService.service';
import { IpcService } from './ipcRender.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  response: any[] = [];
  path: string = '';
  // TODO: Remove
  tmpInfo: string = '';

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef,
    private audioService: AudioService
  ) {}

  openFileDialog = () => {
    this.ipcService.send('open-file-dialog-for-file', null);
    this.ipcService.on('selected-file', (event: any, filesList: any) => {
      this.response = filesList;
      console.log(filesList);
      this.cdRef.detectChanges();
    });
  };

  // TODO: Remove
  tmpPlayAudio = (path: string) => {
    this.tmpInfo = `Playing: ${path}`;
    this.audioService.openAudio(path);
    this.audioService.playAudio();
  };
}
