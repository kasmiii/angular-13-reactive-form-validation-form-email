import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { inject } from '@angular/core';
//import { MatChipEdited, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
//import { NgFor } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Validation from './utils/validation';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    NgFor,
    NgIf,
    MatIconModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
