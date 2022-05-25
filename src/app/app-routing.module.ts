import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AllMusicListComponent } from './all-music-list/all-music-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/song-list', pathMatch: 'full' },
  {
    path: 'song-list',
    component: AllMusicListComponent,
  },
  {
    path: 'album-list',
    component: AlbumListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
