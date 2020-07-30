import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { RobiotService } from '../core/services/robiot.service';
import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapDisplayComponent } from './map-display/map-display.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RemoteControllingComponent } from './remote-controlling/remote-controlling.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent, HomeComponent, RemoteControllingComponent, MapDisplayComponent],
    imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule, NgbNavModule, ReactiveFormsModule],
    providers: [RobiotService],
    bootstrap: [AppComponent],
})
export class AppModule {}
