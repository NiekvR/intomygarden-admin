import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {FilterComponent} from './dashboard/sidebar/filter/filter.component';
import {SidebarComponent} from './dashboard/sidebar/sidebar.component';
import {TicketsComponent} from './dashboard/tickets/tickets.component';
import {TicketComponent} from './dashboard/tickets/ticket/ticket.component';
import {TicketDetailComponent} from './dashboard/ticket-detail/ticket-detail.component';
import {TicketSummaryComponent} from './dashboard/ticket-summary/ticket-summary.component';
import {ErrorCountComponent} from '../shared/error-count/error-count.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FilterComponent,
    SidebarComponent,
    TicketsComponent,
    TicketComponent,
    TicketDetailComponent,
    TicketSummaryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class DashboardModule {
}
