import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent {

  bookForm: FormGroup;
  authors = [
    { id: 1, name: 'Author 1' },
    { id: 2, name: 'Author 2' },
    { id: 3, name: 'Author 3' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {

    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      isbn: ['', Validators.required],
      authorId: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);    }
  }
}
