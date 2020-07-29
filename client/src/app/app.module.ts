import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent, HomeComponent],
    imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule, NgbNavModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
