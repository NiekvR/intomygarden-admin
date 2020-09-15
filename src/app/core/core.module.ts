import {NgModule, Optional, SkipSelf} from '@angular/core';
import {UserService} from "./user/user.service";
import {TicketCollectionService} from "./collections/ticket/ticket-collection.service";
import {NotesCollectionService} from "./collections/notes/notes-collection.service";
import {ErrorCollectionService} from "./collections/error/error-collection.service";



@NgModule({
  providers: [UserService, TicketCollectionService, NotesCollectionService, ErrorCollectionService],
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
