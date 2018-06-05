import { Component, OnInit, Input } from '@angular/core';
import { Translation } from '../translation';
import { DataService } from '../data.service';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {

  constructor(private data: DataService) {
  }



  ngOnInit() {
  }

}
