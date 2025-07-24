import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PoetrydbService {
  private baseUrl = 'https://poetrydb.org';

  constructor(private http: HttpClient) {}

  // Get all authors
  getAuthors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authors`);
  }

  // Get poems by author
  getPoemsByAuthor(author: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/author/${encodeURIComponent(author)}`
    );
  }

  // Get all titles
  getTitles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/title`);
  }

  // Get poem by title
  getPoemByTitle(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/title/${encodeURIComponent(title)}`);
  }

  // Get a random poem
  getRandomPoem(): Observable<any> {
    return this.http.get(`${this.baseUrl}/random`);
  }
}
