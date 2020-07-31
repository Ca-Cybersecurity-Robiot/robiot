import { Component, OnInit } from '@angular/core';
import { terrain1 } from '../../assets/terrains/terrain1';
import { DijkstrasService } from '../../core/services/dijkstras.service';
import { RobiotService } from '../../core/services/robiot.service';

@Component({
    selector: 'app-dijkstras',
    templateUrl: './dijkstras.component.html',
    styleUrls: ['./dijkstras.component.scss'],
    providers: [RobiotService, DijkstrasService],
})
export class DijkstrasComponent implements OnInit {
    public map: Array<Array<string>>;
    public result: { map: Array<Array<{ terrain: string; distance: number }>>; report: string };
    public rows: number[];
    public columns: number[];

    constructor(private dijkstrasService: DijkstrasService, private robiotService: RobiotService) {}

    ngOnInit(): void {
        this.map = this.robiotService.buildArrayFromTerrain(terrain1);

        this.result = this.dijkstrasService.useDijkstrasAlgorithm(this.map, { x: 0, y: 0 }, terrain1.trees);

        this.rows = [...Array(this.map[0].length).keys()];
        this.columns = [...Array(this.map.length).keys()];
    }
}
