import { Injectable } from '@angular/core';

@Injectable()
export class SlugifyService {

  constructor() { }

  /**
   * Returns the given text in slug form.
   * @param text string The text you want to slugify.
   */
  public slugify(text): string {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }
}
