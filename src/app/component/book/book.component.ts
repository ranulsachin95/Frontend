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


const BOOK_DATA: Book[] = [
  {id: 1, name: 'Book 1', isbn: '1111', author: {id:1,firstName:"dd",lastName:"s"}},
  {id: 2, name: 'Book 2', isbn: '2222',  author: {id:1,firstName:"dd",lastName:"s"}},
  {id: 3, name: 'Book 3', isbn: '3333',  author: {id:1,firstName:"dd",lastName:"s"}},
 
];
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit{

  bookForm: FormGroup;
  authors = [
    { id: 1, name: 'Author 1' },
    { id: 2, name: 'Author 2' },
    { id: 3, name: 'Author 3' }
  ];
  authorss: Author[] = [];
  isEditMode = false;
  bookId: number | null = null;


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
    dataSource = new MatTableDataSource<Book>(BOOK_DATA);
  
  
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  

    onSubmit(): void {
      if (this.bookForm.valid) {
        const book: Book = this.bookForm.value;
        // book.author = this.authors.find(author => author.id === +book.author);
        if (this.isEditMode && this.bookId) {
          this.bookService.updateBook(book, this.bookId).subscribe(() => {
            this.router.navigate(['/']);
          });
        } else {
          this.bookService.createBook(book).subscribe(() => {
            this.router.navigate(['/']);
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
}
