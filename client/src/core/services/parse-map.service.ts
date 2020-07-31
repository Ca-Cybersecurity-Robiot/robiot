import { Injectable } from '@angular/core';
import { terrain } from '../../assets/terrains/terrain';

@Injectable({
    providedIn: 'root',
})
export class ParseMapService {
    terrain: terrain;

    getMap(): terrain {
        return this.terrain;
    }

    parseFile(file: string): void {
        const fileTab = file.split('\n');
        for (const fil of fileTab) {
            for( let _i = 0; _i < fil.length; _i++) {
                if (fil[_i] === 'O') {
                        const coordo = {x: Number(_i) , y: Number(fileTab.indexOf(fil)) };
                    this.terrain.trees.push(coordo);
                }
                if (fil[_i] === 'X') {
                        const coordo = {x:Number(_i) , y:Number(fileTab.indexOf(fil)) };
                    this.terrain.obstacles.push(coordo);
                }
            }
        }
        this.terrain.height = fileTab.length - 1;
        this.terrain.width = fileTab[0].length - 1;
        console.log(this.terrain);
    }
}
