import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/firestore";
import {Ticket} from "../../../dashboard/dashboard/tickets/ticket.model";
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TicketCollectionService {
  private ticketCollection: AngularFirestoreCollection<Ticket>;

  constructor(private db: AngularFirestore) {
    this.ticketCollection = this.db.collection<Ticket>('ticket');
  }

  public getTicket(id: string): Observable<Ticket> {
    return this.ticketCollection.doc<Ticket>(id).get().pipe(
      map(doc => this.convertTicket(doc.data(), doc.id))
    );
  }

  public getTickets(): Observable<Ticket[]> {
    return this.ticketCollection.snapshotChanges().pipe(
      map(tickets => tickets.map(a => this.convertTicket(a.payload.doc.data(), a.payload.doc.id)))
    );
  }

  public updateTicket(ticket: Ticket): Observable<any> {
    return from(this.ticketCollection.doc(ticket.id).update(ticket));
  }

  private convertTicket(ticket:any, id: string): Ticket {
    ticket.date = this.setDate(ticket.date);
    if(!!ticket.communication && ticket.communication.length > 0) {
      ticket.communication.map(communication => {
        communication.date = this.setDate(communication.date);
        return communication;
      });
    }
    ticket.id = id;
    return ticket;
  }

  private setDate(date: any): Date {
    return !!(<any>date).seconds ? new Date((<any>date).seconds * 1000): new Date((<string>date));
  }
}
