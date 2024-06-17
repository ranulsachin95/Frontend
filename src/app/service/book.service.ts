import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url="http://localhost:8081/book"

  constructor(private httpClient:HttpClient) { }

  getAllBooks(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}?page=${page}&size=${size}`);
  }
  getBook(id:number):Observable<Book>{
    return this.httpClient.get<any>(`${this.url}/${id}`);
  }
  createBook(book:Book):Observable<Book>{
    return this.httpClient.post<Book>(this.url,book);
  }
  updateBook(book:Book,id:number):Observable<Book>{
    return this.httpClient.put<Book>(`${this.url}/${id}`, book);
  }
}
