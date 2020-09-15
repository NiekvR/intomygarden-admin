import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketCollectionService} from "../../../core/collections/ticket/ticket-collection.service";
import {Subscription} from "rxjs";
import {Status, Ticket} from "../tickets/ticket.model";
import {TicketSummary} from "./ticket-summary.modal";
import {take} from "rxjs/operators";

@Component({
  selector: 'tsa-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.scss']
})
export class TicketSummaryComponent implements OnInit, OnDestroy {

  public projects: { [project: string]: string } = {
    'ekt': 'KuikenTeller',
    'itg': 'IntoTheGarden'
  };
  public ticketSummaries: TicketSummary[] = [];


  private subscription: Subscription;

  constructor(private ticketCollectionService: TicketCollectionService) { }

  ngOnInit() {
    Object.keys(this.projects).forEach(project => this.ticketSummaries.push(this.createNewSummary(project)));
    this.subscription = this.getTickets();
  }

  ngOnDestroy() {
    if(!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getTickets() {
    return this.ticketCollectionService.getTickets().pipe(take(1)).subscribe(tickets => {
      this.createTicketSummary(tickets);
    });
  }

  private createTicketSummary(tickets: Ticket[]) {
    tickets.forEach(ticket => {
      let ticketSummaryIndex = this.ticketSummaries.findIndex(summary => summary.project === ticket.project);
      if(ticketSummaryIndex === -1) {
        this.ticketSummaries.push(this.createNewSummary(ticket.project))
        ticketSummaryIndex = this.ticketSummaries.findIndex(summary => summary.project === ticket.project);
      }

      if(ticket.status == Status.NEW) {
        this.ticketSummaries[ticketSummaryIndex].new++;
      } else if (ticket.status === Status.WAITING) {
        this.ticketSummaries[ticketSummaryIndex].waiting++;
      } else if (ticket.status === Status.IN_PROGRESS) {
        this.ticketSummaries[ticketSummaryIndex].progress++;
      }
    });
  }

  private createNewSummary(project: string): TicketSummary {
    return {
      project: project,
      new: 0,
      waiting: 0,
      progress: 0
    }
  }

}
