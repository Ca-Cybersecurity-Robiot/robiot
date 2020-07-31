import { Component, OnInit } from '@angular/core';
import { ParseMapService } from '../../core/services/parse-map.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    alert: boolean ;
    mapReader = null;
    constructor(private parseMapService: ParseMapService) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit(): void {}
    readFile(file: FileList): void {
        const mapFile = file.item(0);
        const tab = mapFile.name.split('.');
        if (tab[1] === 'txt') {
            this.alert = true;
            mapFile.text().then( (data) => {
                this.mapReader = data;
                this.parseMapService.parseFile(this.mapReader);
            })
        }else{
            this.alert = false ;
            console.log('File type error');
        }

    }
}
