import { ChangeDetectorRef, Injectable } from '@angular/core';
import { IpcService } from './ipcRender.service';

@Injectable()
export class SongListService {
  songlist: any[] = [];

  constructor() {
    // // TODO: Remove
    // this.songlist.push(
    //   {
    //     meta: {
    //       common: {
    //         title: 'Shiori Yoru no Kageri',
    //         artist: 'Asriel',
    //       },
    //       format: {
    //         duration: '326.7395918367347',
    //       },
    //     },
    //     fullpath: '../assets/testSongs/01 Shiori Yoru no Kageri.mp3',
    //   },
    //   {
    //     meta: {
    //       common: {
    //         title: 'Reason',
    //         artist: 'SYU',
    //       },
    //       format: {
    //         duration: '328.70666666666665',
    //       },
    //     },
    //     fullpath: '../assets/testSongs/02 - Reason.flac',
    //     coverURL:
    //       'https://1.bp.blogspot.com/-sYVWq6IP8hs/XHtPVQBmAaI/AAAAAAAARxY/1kF_brccp8Ya3KvL_r-tgD-om0D2axn1QCLcBGAs/s1600/cover.jpg',
    //   }
    // );

    console.log(this.songlist);
  }

  addSongs = (songlist: any[]) => {
    songlist
      .filter((s) => this.songlist.indexOf(s) === -1)
      .sort((a: any, b: any) => a.meta.common.title.localeCompare(b.meta.common.title))
      .forEach((s) => this.songlist.push(s));
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
    return this.songlist
      .filter((e) => e.meta.common.album !== undefined)
      .sort((a, b) => a.meta.common.album.localeCompare(b.meta.common.album));
  };
}
