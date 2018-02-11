import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  public serviceSettings = {
    radarr: {enabled: true, rootPath: 'YOURPATHHERE', diskSpaceDrive: 1},
  };

  public page = {
    title: 'YOUR TITLE HERE',
    subtitle: 'YOUR OPTIONAL SUBTITLE HERE'
  };

  public apis = {
    'radarr': {url: 'http://YOURIPHERE/api', key: 'YOURKEYHERE'},
    'tmdb': {url: 'https://api.themoviedb.org/3', key: 'YOURKEYHERE'}
  };

  constructor() { }

}
