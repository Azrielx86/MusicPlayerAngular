import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AudioService } from '../AudioService.service';
import { Song } from '../song.model';
import { SongListService } from '../songlistService.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit {
  songlist: Song[] = [];
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
