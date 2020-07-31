import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    alert: boolean = null ;
    mapReader= new FileReader()  ;
    mapReader1 = null;
    constructor() {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit(): void {}
    readFile(file: FileList) {
        const mapFile = file.item(0);
        const tab = mapFile.name.split('.');
        if (tab[1] === 'txt') {
            this.alert = true;
            mapFile.text().then( data => {
                this.mapReader1 = data;
                console.log(this.mapReader1)})
        }
        else{
            this.alert = false ;
            console.log('File type error');
        }

    }
}
