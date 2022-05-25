import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AudioService } from '../AudioService.service';
import { IpcService } from '../ipcRender.service';
import { SongListService } from '../songlistService.service';

@Component({
  selector: 'app-all-music-list',
  templateUrl: './all-music-list.component.html',
  styleUrls: ['./all-music-list.component.css'],
})
export class AllMusicListComponent implements OnInit {
  songlist: any[] = [];
  path: string = '';

  @Output()
  selection = new EventEmitter<any>();

  constructor(private audioService: AudioService, private songListService: SongListService) {}

  ngOnInit(): void {
    this.songlist = this.songListService.songlist;
  }

  openAudioFile = (path: string) => {
    this.audioService.openAudio(path);
    this.selection.emit(this.songListService.getMetaSong(path));
    this.audioService.playAudio();
  };
}
