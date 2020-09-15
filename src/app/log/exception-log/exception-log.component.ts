import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../core/user/user.model";
import {Subscription} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {UserService} from "../../core/user/user.service";
import {ErrorCollectionService} from "../../core/collections/error/error-collection.service";
import {Exception} from "../../shared/error-count/exception.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'tsa-exception-log',
  templateUrl: './exception-log.component.html',
  styleUrls: ['./exception-log.component.scss']
})
export class ExceptionLogComponent implements OnInit, OnDestroy {

  public exceptions: Exception[];

  private subscriptions: Subscription[] = [];

  constructor(private afAuth: AngularFireAuth, private router: Router, private errorCollectionService: ErrorCollectionService) { }

  ngOnInit() {
    this.subscriptions.push(this.getExceptions());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public logOut() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['login']));
  }

  public goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  private getExceptions() {
    return this.errorCollectionService.getExceptions()
      .pipe(map(exceptions => exceptions.sort((a, b) => this.compareExceptions(a, b))))
      .subscribe(exceptions => this.exceptions = exceptions);
  }

  private compareExceptions(a: Exception, b: Exception): number {
    return b.date.getTime() - a.date.getTime();
  }

}
