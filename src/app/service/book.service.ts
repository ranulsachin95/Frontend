import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url="/api/author"

  constructor(private httpClient:HttpClient) { }

  getBooks():Observable<Book[]>{
    return this.httpClient.get<Book[]>(this.url);
  }
  getBook(id:number):Observable<Book>{
    return this.httpClient.get<Book>(this.url);
  }
  createBook(book:Book):Observable<Book>{
    return this.httpClient.post<Book>(this.url,book);
  }
  updateBook(book:Book,id:number):Observable<Book>{
    return this.httpClient.post<Book>(this.url,book);
  }
}
