import { ChangeDetectorRef, Component } from '@angular/core';
import { IpcService } from './ipcRender.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  response: any[] = [];
  path: string = '';

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef
  ) {}

  openFileDialog = () => {
    this.ipcService.send('open-file-dialog-for-file', null);
    this.ipcService.on('selected-file', (event: any, filesList: any) => {
      this.response = filesList;
      console.log(filesList);
      this.cdRef.detectChanges();
    });
  };

  ping = () => {
    this.ipcService.send('message', 'ping');
    this.ipcService.on('reply', (event: any, arg: []) => {
      console.log('En respuesta');
      this.response = arg;
      this.cdRef.detectChanges();
    });
  };

  tmpPlayAudio = (path: string) => {
    let audio = new Audio(path);
    audio.play();
  };
}
