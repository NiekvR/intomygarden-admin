import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AuthenticationModule} from "./authentication/authentication.module";
import {SharedModule} from "./shared/shared.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireAuthGuard} from "@angular/fire/auth-guard";
import {CoreModule} from "./core/core.module";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {UserModule} from "./user/user.module";
import { DeviceDetectorModule } from 'ngx-device-detector';
import {AngularFirePerformanceModule} from "@angular/fire/performance";
import {LogModule} from "./log/log.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthenticationModule,
    SharedModule,
    DashboardModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule,
    CoreModule,
    UserModule,
    DeviceDetectorModule.forRoot(),
    LogModule
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
