import {Component, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Status, Ticket, Type} from "../tickets/ticket.model";
import {TicketCollectionService} from "../../../core/collections/ticket/ticket-collection.service";
import {NotesCollectionService} from "../../../core/collections/notes/notes-collection.service";
import {Note} from "../tickets/note.model";
import {of, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {filter, map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'tsa-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.new') get new() { return this.checkStatus(Status.NEW); }
  @HostBinding('class.in-progress') get inProgress() { return this.checkStatus(Status.IN_PROGRESS); }
  @HostBinding('class.waiting') get wating() { return this.checkStatus(Status.WAITING); }
  @HostBinding('class.done') get done() { return this.checkStatus(Status.DONE); }

  @Input() ticket: Ticket;

  public open = false;
  public openEditor = false;
  public Status = Status;
  public Type = Type;
  public note: Note;
  public noteOpen = true;

  private noteSubscription: Subscription;
  private ticketSubscription: Subscription;

  constructor(private el: ElementRef, private ticketCollectionService: TicketCollectionService,
              private notesCollectionService: NotesCollectionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ticketSubscription = this.getTicketFromRoute();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!!changes.ticket && !!changes.ticket.currentValue) {
      this.noteSubscription = this.getNote();
    }
  }

  ngOnDestroy() {
    this.noteSubscription.unsubscribe();
    this.ticketSubscription.unsubscribe();
  }

  public getStatusLabel(status: Status): string {
    switch (status) {
      case Status.NEW: return 'nieuw';
      case Status.IN_PROGRESS: return 'we werken eraan';
      case Status.WAITING: return 'wachten op uw reactie';
      case Status.DONE: return 'opgelost';
    }
  }

  public addReaction() {
    this.openEditor = true;
    requestAnimationFrame(() => {
      this.el.nativeElement.querySelector('textarea').focus();
    });
  }

  public sendReaction() {
    if(!!this.el.nativeElement.querySelector('.react textarea').value) {
      if (!this.ticket.communication) {
        this.ticket.communication = [];
      }
      this.ticket.communication.push({
        date: new Date(),
        content: this.el.nativeElement.querySelector('.react textarea').value,
        type: Type.ADMIN
      });
      this.ticket.status = Status.WAITING;
      this.ticketCollectionService.updateTicket(this.ticket).subscribe(() => this.openEditor = false);
    }
  }

  public saveNote() {
    this.note.note = this.el.nativeElement.querySelector('.notes textarea').value
    this.notesCollectionService.updateNote(this.note).subscribe();
    this.ticket.status = Status.IN_PROGRESS;
    this.ticketCollectionService.updateTicket(this.ticket).subscribe();
  }

  public toggleNote() {
    this.noteOpen = !this.noteOpen;
  }

  private checkStatus(status: Status) {
    return !!this.ticket && this.ticket.status === status;
  }

  private getNote(): Subscription {
    if(!!this.noteSubscription) {
      this.noteSubscription.unsubscribe();
    }
    return this.notesCollectionService.getNoteByTicket(this.ticket.id)
      .subscribe(note => this.note = note);
  }

  private getTicketFromRoute() {
    return this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        filter(id => !!id),
        switchMap(id => !!id ? this.ticketCollectionService.getTicket(id) : of(null)),
        tap(console.log),
        map(ticket => this.ticket = ticket),
        switchMap(ticket => this.notesCollectionService.getNoteByTicket(ticket.id)))
      .subscribe(note => {
        this.note = note;
        this.noteOpen = false;
      });
  }

}
