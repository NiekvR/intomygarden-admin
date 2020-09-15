import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Status, Ticket} from "./ticket.model";
import {TicketCollectionService} from "../../../core/collections/ticket/ticket-collection.service";
import {Subscription} from "rxjs";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {Exception} from "../../../shared/error-count/exception.model";

@Component({
  selector: 'tsa-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() filter: string[];

  public tickets: Ticket[];
  public new: Ticket[];
  public inProgress: Ticket[];
  public inWait: Ticket[];
  public done: Ticket[];
  public showFull = true;
  public selected: Ticket;
  @Output() selectedTicket = new EventEmitter<Ticket>();

  public Status = Status;

  private subscription: Subscription;

  constructor(private ticketCollectionService: TicketCollectionService) { }

  ngOnInit() {
    this.subscription = this.getTickets();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!!changes.filter && !!changes.filter.currentValue) {
      if(!!this.tickets && this.tickets.length > 0) {
        this.filterTickets(this.tickets, this.filter);
      }
    }
  }

  ngOnDestroy() {
    if(!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public selectTicket(ticket: Ticket) {
    this.selected = ticket;
    this.selectedTicket.emit(ticket);
  }

  public drop(event: CdkDragDrop<Ticket[]>, status: Status) {
    let ticket: Ticket = event.item.data;
    ticket.status = status;
    this.ticketCollectionService.updateTicket(ticket).subscribe();
  }

  private getTickets(): Subscription {
    return this.ticketCollectionService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
      this.filterTickets(tickets, this.filter);
    });
  }

  private filterTickets(tickets: Ticket[], filter: string[]) {
    if(!!filter && filter.length > 0) {
      tickets = tickets.filter(ticket => !filter.includes(ticket.project));
    }
    let selectedTicket: Ticket;
    if(!!this.selected) {
      selectedTicket = tickets.find(ticket => ticket.id === this.selected.id);
    } else {
      selectedTicket = tickets[0];
    }
    this.selectedTicket.emit(selectedTicket);
    this.new = tickets.filter(ticket => ticket.status === Status.NEW).sort((a, b) => this.compareTickets(a, b));
    this.inProgress = tickets.filter(ticket => ticket.status === Status.IN_PROGRESS).sort((a, b) => this.compareTickets(a, b));
    this.inWait = tickets.filter(ticket => ticket.status === Status.WAITING).sort((a, b) => this.compareTickets(a, b));
    this.done = tickets.filter(ticket => ticket.status === Status.DONE).sort((a, b) => this.compareTickets(a, b));
  }

  private compareTickets(a: Ticket, b: Ticket): number {
    return b.date.getTime() - a.date.getTime();
  }

}
