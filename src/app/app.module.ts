import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatRadioModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatButtonToggleModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { TranslationsComponent } from './translations/translations.component';
import { SynonymsComponent } from './synonyms/synonyms.component';
import { AntonymsComponent } from './antonyms/antonyms.component';
import { SentencesComponent } from './sentences/sentences.component';


@NgModule({
  declarations: [
    AppComponent,
    TranslationsComponent,
    SynonymsComponent,
    AntonymsComponent,
    SentencesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers: [ApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
