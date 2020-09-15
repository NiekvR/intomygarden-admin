import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {Ticket} from "./tickets/ticket.model";
import {UserService} from "../../core/user/user.service";
import {User} from "../../core/user/user.model";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'tsa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public selectedTicket: Ticket;
  public user: User;
  public isMobile: boolean = false;

  public projects: { [name: string]: { fullName: string, filtered: boolean } } = {
    'ekt': { fullName: 'KuikenTeller', filtered: false},
    'itg': { fullName: 'IntoTheGarden', filtered: false}
  };

  public filter: string[] = [];

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService,
              private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.getUser();
    this.setIsMobile();
  }

  public logOut() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['login']));
  }

  public goToUsers() {
    this.router.navigate(['users']);
  }

  public goToExceptionLog() {
    this.router.navigate(['log']);
  }

  public getUser() {
    this.userService.getUserDoc()
      .subscribe(user => this.user = user);
  }

  public getProjectsArray(user: User) {
    return Object.keys(user.projects).filter(project => user.projects[project]);
  }

  public toggleProject(project: string) {
    this.projects[project].filtered = !this.projects[project].filtered;
    this.filter = Object.keys(this.projects).filter(project => this.projects[project].filtered);
  }

  private setIsMobile() {
    this.isMobile = this.deviceService.isMobile();
  }
}
