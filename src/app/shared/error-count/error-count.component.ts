import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ErrorCollectionService} from "../../core/collections/error/error-collection.service";
import {Subscription} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'tsa-error-count',
  templateUrl: './error-count.component.html',
  styleUrls: ['./error-count.component.scss']
})
export class ErrorCountComponent implements OnInit, OnDestroy {

  public exceptions: number;

  private subscriptions: Subscription[] = [];

  constructor(private errorCollectionService: ErrorCollectionService) { }

  ngOnInit() {
    this.subscriptions.push(this.getNumberOfExceptions());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getNumberOfExceptions(): Subscription {
    return this.errorCollectionService.getNumberOfExceptions()
      .subscribe(exceptions => this.exceptions = exceptions);
  }
}
