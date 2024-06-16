import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from '../../model/author';
import { AuthorService } from '../../service/author.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent {

  authorForm: FormGroup;
  authorId: number | null = null;
  isEditMode = false;
  totalElements: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort ;
  
    displayedColumns: string[] = ['id', 'firstName', 'lastName'];
    dataSource = new MatTableDataSource<Author>();

  constructor(private fb: FormBuilder,
     private router: Router,
     private authorService: AuthorService,
    ) {

    this.authorForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAuthors();
  }
  loadAuthors() {
    this.authorService.getAllAuthors().subscribe(data => {
      
      this.dataSource.data = data;
      this.totalElements = data.length;
      debugger
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      const author: Author = this.authorForm.value;
    
      debugger
      if (this.isEditMode && this.authorId) {
        this.authorService.updateAuthor(this.authorId,author).subscribe(() => {
          this.router.navigate(['/author']);
        });
      } else {
        this.authorService.createAuthor(author).subscribe(() => {
          this.router.navigate(['/author']);
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
    this.loadAuthors();
  }

}
