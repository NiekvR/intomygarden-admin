import {Component, OnInit} from '@angular/core';
import {UserService} from "./core/user/user.service";

@Component({
  selector: 'tsa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tern-support-admin';

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
}
