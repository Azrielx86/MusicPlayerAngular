import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioService } from './AudioService.service';
import { IpcService } from './ipcRender.service';
import { PlayerBarComponent } from './player-bar/player-bar.component';
import { AllMusicListComponent } from './all-music-list/all-music-list.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlayerBarComponent,
    AllMusicListComponent,
    AlbumListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [IpcService, AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
