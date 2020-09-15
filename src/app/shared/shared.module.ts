import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ButtonComponent } from './button/button.component';
import {HttpClientModule} from "@angular/common/http";
import {ErrorCountComponent} from "./error-count/error-count.component";
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    ButtonComponent,
    ErrorCountComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    HttpClientModule,
    ErrorCountComponent,
    DragDropModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ]
})
export class SharedModule { }
