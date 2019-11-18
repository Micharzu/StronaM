import { Component, OnInit, Input } from '@angular/core';
import { Piesn } from '../../piesn.model';

@Component({
  selector: 'app-pojedyncza-piesn',
  templateUrl: './pojedyncza-piesn.component.html',
  styleUrls: ['./pojedyncza-piesn.component.css']
})
export class PojedynczaPiesnComponent implements OnInit {
  @Input() piesn: Piesn;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
