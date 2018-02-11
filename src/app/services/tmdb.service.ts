import { ConfigService } from './config.service';
import { Task , TaskGroup } from 'taskgroup';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RadarrService } from './radarr.service';

@Injectable()
export class MovieDatabaseService {
  constructor(private http: HttpClient,
    private radarr: RadarrService,
    private config: ConfigService) {}

  /**
   * Searches TMDB for movies.
   * @param query string The query string.
   * @param page number The page that you want to view.
   */
  public search(query, page): Promise<Object> {
    return new Promise((resolve, reject) => {
      const options = '?api_key=' + this.config.apis['tmdb']['key'] + '&query=' + query + '&language=en-US' + '&page=' + page;
      const url = this.config.apis['tmdb']['url'] + '/search/movie' + options;
      this.http.get(url).toPromise().then((res) => {
        if (!res['results']) { return reject('No Movies Found'); }
        TaskGroup.create({
          name: `Check if the fetched results exist locally`,
          onceDone: (err) => {
            if (err) { return reject(err); }
            return resolve(res);
          },
          tasks: res['results'].map((result, index) => {
            return new Task((done) => {
              res['results'][index]['exists'] = this.radarr.checkID(result['id']);
              return done();
            });
          })
        }).run();
      }).catch((error) => reject(error));
    });
  }
}
