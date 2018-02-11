import { ConfigService } from './../../services/config.service';
import { RadarrService } from './../../services/radarr.service';
import { MovieDatabaseService } from './../../services/tmdb.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http/src/client';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public modalData: Object;
  public storageSpace: Object;
  public searchQuery;
  public searchType = 'movie';
  public searchResponse: Object;
  public currentPage = 1;
  constructor(
    private api: MovieDatabaseService,
    private spinnerService: Ng4LoadingSpinnerService,
    private radarr: RadarrService,
    private config: ConfigService) {
      this.spinnerService.show();
  }

  ngOnInit() {
    this.initMoviesAndSeries();
  }

  private initMoviesAndSeries() {
    this.radarr.getAndSetMoviesArray().then(() => {
      this.radarr.getDiskspace().then((response) => {
        this.storageSpace = response[this.config.serviceSettings.radarr.diskSpaceDrive];
        this.storageSpace['usedSpace'] = this.getUsedSpace(this.storageSpace['freeSpace'], this.storageSpace['totalSpace']);
        this.spinnerService.hide();
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
  }

  public resetAndSearch() {
    this.currentPage = 1;
    this.search();
  }

  private search() {
    window.scrollTo(0, 0);
    this.spinnerService.show();
    this.api.search(this.searchQuery, this.currentPage).then((response: Object) => {
      this.spinnerService.hide();
      this.searchResponse = response;
    }).catch((error) => {
      this.spinnerService.hide();
      if (error === 'No Movies Found') {
        alert('Could not find any results for that search! Sorry!');
      }else {
        console.log(error);
      }
    });
  }

  private nextPage() {
    // If it doesn't exist or if there are no more results return.
    if (!this.searchResponse || this.searchQuery['totalResults'] > (this.currentPage * 10)) { return; }
    this.currentPage += 1;
    this.search();
  }

  private prevPage() {
    // If it doesn't exist or if they're on the first page return.
    if (!this.searchResponse || (this.currentPage - 1) <= 0) { return; }
    this.currentPage -= 1;
    this.search();
  }

  private downloadItem(item) {
    if (item.exists) {return; }
    this.spinnerService.show();
    this.radarr.postNewMovie(item).then(() => {
      this.initMoviesAndSeries();
    });
  }

  public openModal(movie) {
    this.modalData = movie;
  }

  public closeModal() {
    this.modalData = undefined;
  }

  public closeModalAndDownload(movie) {
    const index = this.searchResponse['results'].indexOf(movie);
    this.closeModal();
    this.downloadItem(movie);
    this.searchResponse['results'][index]['exists'] = true;
  }

  public bToTB(bytes) {
    return parseFloat((bytes / 1099511627776).toString()).toFixed(2) + ' TB';
  }

  public getUsedSpace(freeSpace, totalSpace) {
    return totalSpace - freeSpace;
  }
}
