import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AudioService } from '../AudioService.service';
import { IpcService } from '../ipcRender.service';

@Component({
  selector: 'app-all-music-list',
  templateUrl: './all-music-list.component.html',
  styleUrls: ['./all-music-list.component.css'],
})
export class AllMusicListComponent implements OnInit {
  response: any[] = [];
  path: string = '';

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    // TODO: Remove
    this.response.push(
      {
        meta: {
          common: {
            title: 'Shiori Yoru no Kageri',
            artist: 'Asriel',
          },
          format: {
            duration: '326.7395918367347',
          },
        },
        fullpath: '../assets/testSongs/01 Shiori Yoru no Kageri.mp3',
      },
      {
        meta: {
          common: {
            title: 'Reason',
            artist: 'SYU',
          },
          format: {
            duration: '328.70666666666665',
          },
        },
        fullpath: '../assets/testSongs/02 - Reason.flac',
        coverURL:
          'https://1.bp.blogspot.com/-sYVWq6IP8hs/XHtPVQBmAaI/AAAAAAAARxY/1kF_brccp8Ya3KvL_r-tgD-om0D2axn1QCLcBGAs/s1600/cover.jpg',
      }
    );

    console.log(this.response);
    
  }

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
    this.audioService.openAudio(path);
    this.audioService.playAudio();
  };
}
