import { ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { Event } from '@angular/router';
import { AudioService } from './services/AudioService.service';
import { IpcService } from './services/ipcRender.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Output()
  currentSong: any;

  changeCurrent = (song: any) => {
    console.log(song);

    this.currentSong = song;
  };
}
