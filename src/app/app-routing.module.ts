import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './component/book/book.component';
import { AuthorComponent } from './component/author/author.component';

const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  {path:'book',component:BookComponent},
  {path:'author',component:AuthorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
