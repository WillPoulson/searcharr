import { ConfigService } from './services/config.service';

import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';

import { MovieDatabaseService } from './services/tmdb.service';
import { RadarrService } from './services/radarr.service';

const appRoutes: Routes = [
  { path: '', component: SearchPageComponent, pathMatch: 'full'},
];


@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FormsModule
  ],
  providers: [
    MovieDatabaseService,
    RadarrService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
