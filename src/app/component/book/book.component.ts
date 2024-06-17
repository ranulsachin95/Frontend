import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../model/book';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Author } from '../../model/author';
import { AuthorService } from '../../service/author.service';
import { BookService } from '../../service/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeInterval } from 'rxjs';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {

  bookForm: FormGroup;
  book: Book;

  authors: Author[] = [];
  isEditMode = false;
  bookId: number | null = null;
  totalElements: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;



  constructor(private fb: FormBuilder, private router: Router,
    private bookService: BookService,
    private authorService: AuthorService,
    private snackBar: MatSnackBar,
  ) {

    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      isbn: ['', Validators.required],
      authorId: ['', Validators.required]
    });
    this.book = {
      id: 2,
      name: 'Name',
      isbn: '0000000',
      author: {
        firstName: 'First Name',
        lastName: 'Last Name',
        id: 1
      }


    }
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'isbn', 'author', 'view', 'edit'];
  dataSource = new MatTableDataSource<Book>();


  ngOnInit() {
    this.loadBooks();
    this.loadAuthors();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  loadAuthors() {
    this.authorService.getAllAuthors().subscribe(data => {
      this.authors = data;
    });
  }

  loadBooks(): void {
    this.bookService.getAllBooks(this.currentPage, this.pageSize).subscribe(data => {
      this.dataSource.data = data.content;
      this.totalElements = data.totalElements;
      this.paginator.length = this.totalElements;
      this.paginator.pageIndex = this.currentPage;

    });
  }

  getBook(id: number) {
    this.bookService.getBook(id).subscribe(data => {

      this.bookForm.setValue({
        name: data.name,
        isbn: data.isbn,
        authorId: data.author?.id
      });
      this.isEditMode = true;
      this.bookId = id;
      this.viewBook(id);
    });
  }
  viewBook(id: number) {
    this.bookService.getBook(id).subscribe(data => {

      this.book = data;
    });

  }


  onSubmit(): void {
    if (this.bookForm.valid) {
      const book: Book = this.bookForm.value;
      book.author = this.authors.find(author => author.id === +this.bookForm.get('authorId')?.value);
      if (this.isEditMode && this.bookId) {
        this.bookService.updateBook(book, this.bookId).subscribe(() => {
          this.showSuccess("SuccessFully  Updated");
        });
      } else {
        this.bookService.createBook(book).subscribe(() => {
          this.showSuccess("SuccessFully  Created");
          
          
        });
      }

    }
  
  }

  showSuccess(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: ['success-snackbar'],
      
    } );
    setTimeout(() => 
      {
          window.location.reload();
      },
      3000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBooks();
  }
}
