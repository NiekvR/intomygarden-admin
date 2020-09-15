import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tsa-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() animated: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
