import {Component, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import {Status, Ticket, Type} from '../ticket.model';

@Component({
  selector: 'tsa-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @HostBinding('class.new') get new() { return this.checkStatus(Status.NEW); }
  @HostBinding('class.in-progress') get inProgress() { return this.checkStatus(Status.IN_PROGRESS); }
  @HostBinding('class.waiting') get wating() { return this.checkStatus(Status.WAITING); }
  @HostBinding('class.done') get done() { return this.checkStatus(Status.DONE); }

  @Input() ticket: Ticket;
  @Input() showFull = false;

  public open = false;
  public openEditor = false;
  public Status = Status;
  public Type = Type;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  public toggle() {
    this.open = !this.open;
  }

  public getStatusLabel(status: Status): string {
    switch (status) {
      case Status.NEW: return 'nieuw';
      case Status.IN_PROGRESS: return 'we werken eraan';
      case Status.WAITING: return 'wachten op uw reactie';
      case Status.DONE: return 'opgelost';
    }
  }

  public closeTicket() {
    this.ticket.status = Status.DONE;
  }

  public addReaction() {
    this.openEditor = true;
    requestAnimationFrame(() => {
      this.el.nativeElement.querySelector('textarea').focus();
    });
  }

  public sendReaction() {
    if (!this.ticket.communication) {
      this.ticket.communication = [];
    }
    this.ticket.communication.push({
      date: new Date(),
      content: this.el.nativeElement.querySelector('textarea').value,
      type: Type.USER
    });
    this.openEditor = false;
  }

  private checkStatus(status: Status) {
    return this.ticket.status === status;
  }
}
