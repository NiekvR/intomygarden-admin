import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {from, Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Note} from "../../../dashboard/dashboard/tickets/note.model";

@Injectable({
  providedIn: 'root'
})
export class NotesCollectionService {
  private noteCollection: AngularFirestoreCollection<Note>;

  constructor(private db: AngularFirestore) {
    this.noteCollection = this.db.collection<Note>('note');
  }

  public addNote(note: Note): Observable<Note> {
    return from(this.noteCollection.add(note))
      .pipe(map(doc => {
        note.id = doc.id;
        return note;
      }));
  }

  public getNoteByTicket(id: string): Observable<Note> {
    return from(this.noteCollection.ref.where('ticketId', '==', id).limit(1).get())
      .pipe(
        map(queryData => {
          let note;
          if(!!queryData.docs[0]) {
            note = queryData.docs[0].data() as Note;
            note.id = queryData.docs[0].id;
          }
          return note;
        }),
        switchMap(note => !!note ? of(note) : this.addNote(this.createNote(id))));
  }

  public updateNote(note: Note): Observable<any> {
    return from(this.noteCollection.doc(note.id).update(note));
  }

  private createNote(id: string): Note {
    return {
      ticketId: id,
      note: ''
    }
  }
}
