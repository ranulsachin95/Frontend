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


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit{

  bookForm: FormGroup;

  authors: Author[] = [];
  isEditMode = false;
  bookId: number | null = null;
  totalElements: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  


  constructor(private fb: FormBuilder, private router: Router,
    private bookService: BookService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
  ) {

    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      isbn: ['', Validators.required],
      authorId: ['', Validators.required] 
    });
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort ;
  
    displayedColumns: string[] = ['id', 'name', 'isbn', 'author'];
    dataSource = new MatTableDataSource<Book>();
  
  
    ngOnInit() {
      this.loadBooks();
      this.loadAuthors();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    loadAuthors(){
      this.authorService.getAllAuthors().subscribe(data => {
       this.authors=data;
      });
    }

    loadBooks(): void {
      this.bookService.getAllBooks(this.currentPage, this.pageSize).subscribe(data => {
      
        this.dataSource.data = data;
        this.totalElements = data.length;
      });
    }
  

    onSubmit(): void {
      if (this.bookForm.valid) {
        const book: Book = this.bookForm.value;
        book.author = this.authors.find(author => author.id === +this.bookForm.get('authorId')?.value);
        debugger
        if (this.isEditMode && this.bookId) {
          this.bookService.updateBook(book, this.bookId).subscribe(() => {
            this.router.navigate(['/book']);
          });
        } else {
          this.bookService.createBook(book).subscribe(() => {
            this.router.navigate(['/book']);
          });
        }
      }
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
