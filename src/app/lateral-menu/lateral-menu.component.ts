import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpcService } from '../services/ipcRender.service';
import { SongListService } from '../services/songlistService.service';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css'],
})
export class LateralMenuComponent implements OnInit {
  constructor(
    private ipcService: IpcService,
    private songListService: SongListService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openFileDialog = () => {
    this.ipcService.send('open-file-dialog-for-file', null);
    this.ipcService.on('selected-file', (event: any, filesList: any) => {
      this.songListService.addSongs(filesList);
      console.log(this.songListService.songlist);
    });
  };

  changeToSongList = () => {
    this.router.navigate(['/song-list']);
  };

  changeToAlbumList = () => {
    this.router.navigate(['/album-list']);
  };
}
