import { Component, OnInit } from '@angular/core';
import { IpcService } from '../ipcRender.service';
import { SongListService } from '../songlistService.service';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css'],
})
export class LateralMenuComponent implements OnInit {
  constructor(private ipcService: IpcService, private songListService: SongListService) {}

  ngOnInit(): void {}

  openFileDialog = () => {
    this.ipcService.send('open-file-dialog-for-file', null);
    this.ipcService.on('selected-file', (event: any, filesList: any) => {
      this.songListService.addSongs(filesList);
      console.log(this.songListService.songlist);
    });
  };
}
