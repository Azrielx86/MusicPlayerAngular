import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { Song } from './song.model';

@Injectable()
export class SongListService {
  songlist: Song[] = [];
  albumlist: Album[] = [];

  constructor() {
    this.songlist.push(
      new Song(
        'Reason.flac',
        {
          common: {
            title: 'Otra de SYU XD',
            artist: 'SYU',
            album: 'Vorvaldos',
          },
          format: {
            duration: '328.70666666666665',
          },
        },
        '../assets/testSongs/02 - Reason.flac',
        'https://1.bp.blogspot.com/-sYVWq6IP8hs/XHtPVQBmAaI/AAAAAAAARxY/1kF_brccp8Ya3KvL_r-tgD-om0D2axn1QCLcBGAs/s1600/cover.jpg'
      ),
      new Song(
        'Shiroi Yoru no Kageri.mp3',
        {
          common: {
            title: 'Shiori Yoru no Kageri',
            artist: 'Asriel',
            album: 'Shiori Yoru no Kageri',
          },
          format: {
            duration: '326.7395918367347',
          },
        },
        '../assets/testSongs/01 Shiori Yoru no Kageri.mp3',
        ''
      ),
      new Song(
        'Reason.flac',
        {
          common: {
            title: 'Reason',
            artist: 'SYU',
            album: 'Vorvaldos',
          },
          format: {
            duration: '328.70666666666665',
          },
        },
        '../assets/testSongs/02 - Reason.flac',
        'https://1.bp.blogspot.com/-sYVWq6IP8hs/XHtPVQBmAaI/AAAAAAAARxY/1kF_brccp8Ya3KvL_r-tgD-om0D2axn1QCLcBGAs/s1600/cover.jpg'
      )
    );
  }

  addSongs = (songlist: any[]): void => {
    songlist.forEach((song) => {
      if (!this.songlist.some((s) => s.name === song.name)) {
        this.songlist.push(new Song(song.name, song.meta, song.fullpath, song.coverURL));
      }
    });

    this.albumlist = this.getAlbumList();
  };

  getMetaSong = (path: string): any | undefined => {
    for (const value of this.songlist) {
      if (value.fullpath === path) {
        return value;
      }
    }
    return undefined;
  };

  sortedByAlbum = (): Song[] => {
    return [...this.songlist].sort((a, b) => a.album.localeCompare(b.album));
  };

  sortedByArtist = (): Song[] => {
    return [...this.songlist].sort((a, b) => a.artist.join(',').localeCompare(b.artist.join(',')));
  };

  sortedByTitle = (): Song[] => {
    return [...this.songlist].sort((a, b) => a.title.localeCompare(b.title));
  };

  getFromAlbum = (album: string): Song[] => {
    return [...this.songlist].filter((song) => song.album === album);
  };

  getAlbumList = (): any => {
    const albumList: Album[] = [];

    this.songlist.forEach((song) => {
      if (!albumList.some((album) => album.name === song.album)) {
        albumList.push(new Album(song.album, [song], song.coverURL));
      } else {
        const index = albumList.findIndex((album) => album.name === song.album);
        albumList[index].songs.push(song);
      }
    });

    return albumList;
  };
}
