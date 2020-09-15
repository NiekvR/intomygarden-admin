import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {from, Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Note} from "../../../dashboard/dashboard/tickets/note.model";
import {Exception} from "../../../shared/error-count/exception.model";
import {Ticket} from "../../../dashboard/dashboard/tickets/ticket.model";

@Injectable({
  providedIn: 'root'
})
export class ErrorCollectionService {
  private errorCollection: AngularFirestoreCollection<Exception>;

  constructor(private db: AngularFirestore) {
    this.errorCollection = this.db.collection<Exception>('error');
  }

  public getNumberOfExceptions(): Observable<number> {
    return this.getExceptions().pipe(map(exceptions => exceptions.length));
  }

  public getExceptions(): Observable<Exception[]> {
    return this.errorCollection.snapshotChanges().pipe(
      map(tickets => tickets.map(a => {
        let exception = a.payload.doc.data() as Exception;
        exception.date = this.setDate(exception.date);
        exception.id = a.payload.doc.id;
        return exception;
      }))
    );
  }

  private setDate(date: any): Date {
    return !!(<any>date).seconds ? new Date((<any>date).seconds * 1000): new Date((<string>date));
  }
}
