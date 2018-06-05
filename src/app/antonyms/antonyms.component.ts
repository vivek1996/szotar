import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-antonyms',
  templateUrl: './antonyms.component.html',
  styleUrls: ['./antonyms.component.css']
})
export class AntonymsComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }

}
