import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapDisplayComponent } from './map-display/map-display.component';
import { RemoteControllingComponent } from './remote-controlling/remote-controlling.component';

const routes: Routes = [
    {
        path: 'remote-control',
        component: RemoteControllingComponent,
    },
    {
        path: 'map-display',
        component: MapDisplayComponent,
    },
    {
        path: '**',
        component: HomeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
