import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { slugify } from '../functions/slugify';

@Injectable()
export class RadarrService {
  public movies: Array<Object>;
  constructor(private http: HttpClient, private config: ConfigService) {}

  /**
   * Gets all your movies from Radarr and sets the movies array to the response.
   */
  public getAndSetMoviesArray(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getMovies().then((response: Array<Object>) => {
        this.movies = response;
        resolve();
      }).catch((error) => reject(error));
    });
  }

  /**
   * Gets all your movies from Radarr.
   */
  public getMovies(): Promise<Object> {
    return new Promise((resolve, reject) => {
      const url = this.config.apis['radarr']['url'] + '/movie/?apikey=' + this.config.apis['radarr']['key'];
      this.http.get(url).toPromise().then((res) => {
        resolve(res);
      }).catch((error) => reject(error));
    });
  }

  /**
   * Posts a new omdb movie to Radarr.
   * It does this by first querying tmdb to get a tmdbid so it can be posted into Radarr.
   * Once it's added to Radarr it'll automatically go and search your indexers for it.
   * @param movie object The omdb object you want to add to Radarr.
   */
  public postNewMovie(movie): Promise<Object> {
    return new Promise((resolve, reject) => {
      const payload: Object = {
        title: movie.original_title,
        qualityProfileId: 6,
        year: new Date(movie.release_date).getFullYear(),
        titleSlug: slugify(movie.original_title),
        rootFolderPath: this.config.serviceSettings.radarr.rootPath,
        tmdbID: movie['id'],
        images: [
          {
            coverType: 'poster',
            url: 'https//image.tmdb.org/t/p/original' + movie['poster_path']
          },
          {
            coverType: 'banner',
            url: 'https//image.tmdb.org/t/p/original' + movie['backdrop_path']
          }
        ],
        monitored: true,
        addOptions: {searchForMovie: true}
      };
      const url = this.config.apis['radarr']['url'] + '/movie/?apikey=' + this.config.apis['radarr']['key'];
      this.http.post(url, payload).toPromise().then((res) => {
        resolve(res);
      }).catch((error) => reject(error));
    });
  }

  /**
   * Checks if the given ID is already in your collection.
   * @param id number The imdbID of the movie you want to check.
   */
  public checkID(id): Boolean {
    return this.movies.some(movie => movie['tmdbId'] === id);
  }

  /**
   * Queries Radarr for diskspace.
   * Returns an object containing drives.
   */
  public getDiskspace(): Promise<Object> {
    return new Promise((resolve, reject) => {
      const url = this.config.apis['radarr']['url'] + '/diskspace/?apikey=' + this.config.apis['radarr']['key'];
      this.http.get(url).toPromise().then((res) => {
        resolve(res);
      }).catch((error) => reject(error));
    });
  }
}
