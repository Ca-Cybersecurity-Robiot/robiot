import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { terrain1 } from '../../assets/terrains/terrain1';
import { DijkstrasService } from '../../core/services/dijkstras.service';
import { RobiotService } from '../../core/services/robiot.service';
import { Configuration } from '../../shared/models/configuration.model';
import { Terrain } from '../../shared/models/terrain.model';

@Component({
    selector: 'app-remote-controlling',
    templateUrl: './remote-controlling.component.html',
    styleUrls: ['./remote-controlling.component.scss'],
})
export class RemoteControllingComponent implements OnInit {
    public positionConfig: Configuration;
    public statusConfig: Configuration;
    public batteryConfig: Configuration;
    public form: FormGroup;
    private coordValueRegex = new RegExp('[+-]?([0-9]*[.])?[0-9]+');
    public infoMessage: string;
    private terrain: Terrain;
    private map: Array<Array<string>>;
    public updateMap: Subject<void> = new Subject<void>();

    constructor(
        public robiotService: RobiotService,
        private dijkstrasService: DijkstrasService,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.initData();

        this.form = this.formBuilder.group({
            coord: new FormControl('x', Validators.required),
            value: new FormControl('', [Validators.pattern(this.coordValueRegex), Validators.required]),
        });
    }

    submitForm() {
        const validDestination = this.robiotService.checkDestinationValidity(
            this.map,
            this.form.value.coord,
            this.form.value.coord == 'x'
                ? parseInt(this.robiotService.getXCoordFromConfig(this.positionConfig).toString())
                : parseInt(this.robiotService.getYCoordFromConfig(this.positionConfig).toString()),
            this.form.value.value,
            this.form.value.coord == 'x'
                ? parseInt(this.robiotService.getYCoordFromConfig(this.positionConfig).toString())
                : parseInt(this.robiotService.getXCoordFromConfig(this.positionConfig).toString()),
        );

        if (validDestination.valid) {
            // Builds the new config object to update
            const newConfig = new Configuration();
            newConfig.id = this.positionConfig.id;
            let content: string;
            if (this.form.value.coord == 'x') {
                content =
                    Number.parseFloat(this.form.value.value).toFixed(1).toString() +
                    ',' +
                    this.robiotService.getYCoordFromConfig(this.positionConfig);
            } else {
                content =
                    this.robiotService.getXCoordFromConfig(this.positionConfig) +
                    ',' +
                    Number.parseFloat(this.form.value.value).toFixed(1).toString();
            }
            newConfig.content = content;

            // Saves the newly build config
            this.robiotService.saveConfig(newConfig).subscribe((data) => {
                this.displayInfoMessage(data['message']['content']);
            });
        } else {
            // If the destination isn't valid, display a message
            this.displayInfoMessage(validDestination.msg);
        }
    }

    // Get the data necessary for our component
    initData() {
        this.getConfigData();
        this.terrain = terrain1;
        this.map = this.robiotService.buildArrayFromTerrain(this.terrain);
    }

    getConfigData() {
        // Status config
        this.robiotService.getConfig(201).subscribe((config) => {
            // if status changes from moving to stopped, update the map
            if (this.statusConfig?.content == 'moving' && config?.content == 'stopped') {
                this.updateMap.next();
            }
            this.statusConfig = config;
        });
        // Battery Config
        this.robiotService.getConfig(101).subscribe((config) => (this.batteryConfig = config));
        // Position config
        this.robiotService.getConfig(301).subscribe((config) => {
            this.positionConfig = config;
            setTimeout(() => {
                this.getConfigData();
            }, 1000);
        });
    }

    canSubmit(): boolean {
        // If form is valid and robot isn't stopped
        return this.form.valid && this.statusConfig.content == 'stopped';
    }

    displayInfoMessage(msg: string) {
        this.infoMessage = msg;
        // Cleans message after five seconds
        setTimeout(() => {
            this.infoMessage = null;
        }, 5000);
    }
}
