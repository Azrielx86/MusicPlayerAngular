import { ChangeDetectorRef, Injectable } from '@angular/core';
import { IpcService } from './ipcRender.service';
import { Song } from './song.model';

@Injectable()
export class SongListService {
  songlist: Song[] = [];

  constructor() {}

  addSongs = (songlist: any[]) => {
    songlist.forEach((element) => {
      this.songlist.push(new Song(element.name, element.meta, element.fullpath, element.coverURL));
    });
  };

  getMetaSong = (path: string) => {
    for (const value of this.songlist) {
      if (value.fullpath === path) {
        return value;
      }
    }
    return undefined;
  };

  sortedByAlbum = () => {
    return this.songlist.sort((a, b) => a.album.localeCompare(b.album));
  };
}
