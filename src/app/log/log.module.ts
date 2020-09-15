import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExceptionLogComponent } from './exception-log/exception-log.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [ExceptionLogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LogModule { }
