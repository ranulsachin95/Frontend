import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthorComponent } from './component/author/author.component';
import { BookComponent } from './component/book/book.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import{MatTableModule} from '@angular/material/table'

import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    BookComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
