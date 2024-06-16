import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = 'http://localhost:8081/author';

  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<Author[]> {

    return this.http.get<Author[]>(this.baseUrl);
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/${id}`);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.baseUrl, author);
  }

  updateAuthor(id: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.baseUrl}/${id}`, author);
  }
}
