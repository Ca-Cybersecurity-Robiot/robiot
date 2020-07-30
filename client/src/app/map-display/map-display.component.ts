import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { terrain1 } from '../../assets/terrains/terrain1';
import { RobiotService } from '../../core/services/robiot.service';
import { CaseValue } from '../../shared/models/case-value.model';
import { Configuration } from '../../shared/models/configuration.model';
import { Terrain } from '../../shared/models/terrain.model';

@Component({
    selector: 'app-map-display',
    templateUrl: './map-display.component.html',
    styleUrls: ['./map-display.component.scss'],
})
export class MapDisplayComponent implements OnInit {
    @Input() events: Observable<void>;
    private updateMap: Subscription;

    public map: Array<Array<string>>;
    public rows: Array<any>;
    public columns: Array<any>;
    public terrain: Terrain;
    private positionConfig: Configuration;

    constructor(private robiotService: RobiotService) {
        this.robiotService = robiotService;
    }

    ngOnInit(): void {
        this.createMap();

        this.updateMap = this.events.subscribe(() => this.createMap());
    }

    createMap() {
        // Get the terrain definition from /assets/terrains
        this.terrain = terrain1;

        this.map = this.robiotService.buildArrayFromTerrain(this.terrain);

        // Defines arrays to interate over, according to dimensions of the array
        this.rows = [...Array(this.map[0].length).keys()];
        this.columns = [...Array(this.map.length).keys()];

        this.robiotService.getConfig(301).subscribe((config) => {
            this.positionConfig = config;
            this.map[parseInt(this.robiotService.getXCoordFromConfig(this.positionConfig).toString())][
                parseInt(this.robiotService.getYCoordFromConfig(this.positionConfig).toString())
            ] = CaseValue.ROBOT;
        });
    }
}
