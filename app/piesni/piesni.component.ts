import { Component, OnInit } from '@angular/core';
import { PiesniService } from './piesni.service';
import { DataStorageService } from './data-storage.service';

@Component({
  selector: 'app-piesni',
  templateUrl: './piesni.component.html',
  styleUrls: ['./piesni.component.css'],
  providers: [PiesniService, DataStorageService]
})
export class PiesniComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
