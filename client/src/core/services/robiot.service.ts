import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CaseValue } from '../../shared/models/case-value.model';
import { Configuration } from '../../shared/models/configuration.model';
import { Direction } from '../../shared/models/direction.enum';
import { Terrain } from '../../shared/models/terrain.model';

@Injectable({
    providedIn: 'root',
})
export class RobiotService {
    private readonly resourceUrl;

    constructor(private http: HttpClient) {
        this.resourceUrl = environment.apiUrl;
    }

    // Gets the value of abscissa from a config's content value
    getXCoordFromConfig(config: Configuration): string {
        // Checks that the provided config is form a position
        if (config.id == 301) {
            return config?.content.split(',')[0];
        }
    }

    // Gets the value of ordinate from a config's content value
    getYCoordFromConfig(config: Configuration): string {
        // Checks that the provided config is form a position
        if (config.id == 301) {
            return config?.content.split(',')[1];
        }
    }

    getConfig(id: number): Observable<Configuration> {
        return this.http.get<Configuration>(this.resourceUrl + '/robiot/' + id);
    }

    saveConfig(config: Configuration) {
        return this.http.put(this.resourceUrl + '/robiot/' + config.id, config);
    }

    // Creates a bi-dimensionnal array representing a terrain from a terrain object
    buildArrayFromTerrain(terrain: Terrain): Array<Array<string>> {
        const map = Array.from({ length: terrain.width }, () =>
            Array.from({ length: terrain.height }, () => CaseValue.EMPTY),
        );

        // Start
        map[0][0] = CaseValue.START;

        // Obstacles
        for (const obstacle of terrain.obstacles) {
            switch (obstacle.direction) {
                case Direction.DOWN: {
                    for (let i = obstacle.startY; i < obstacle.startY + obstacle.length; i++) {
                        map[obstacle.startX][i] = CaseValue.OBSTACLE;
                    }
                    break;
                }
                case Direction.UP: {
                    for (let i = obstacle.startY; i > obstacle.startY - obstacle.length; i--) {
                        map[obstacle.startX][i] = CaseValue.OBSTACLE;
                    }
                    break;
                }
                case Direction.LEFT: {
                    for (let i = obstacle.startX; i > obstacle.startX - obstacle.length; i--) {
                        map[i][obstacle.startY] = CaseValue.OBSTACLE;
                    }
                    break;
                }
                case Direction.RIGHT: {
                    for (let i = obstacle.startX; i < obstacle.startX + obstacle.length; i++) {
                        map[i][obstacle.startY] = CaseValue.OBSTACLE;
                    }
                    break;
                }
            }
        }

        // Trees
        for (const tree of terrain.trees) {
            map[tree.x][tree.y] = CaseValue.TREE;
        }

        return map;
    }

    // Checks if a destination is obtainable (not out of bound, doesnt cross obstacles etc..)
    checkDestinationValidity(
        map,
        coordToChange,
        oldValue,
        newValue,
        otherCoordValue,
    ): { valid: boolean; msg?: string } {
        switch (coordToChange) {
            case 'x':
                // Checks bounds
                if (newValue > map.length || newValue < 0) {
                    return { valid: false, msg: 'Destination non valide, en dehors du terrain' };
                }
                // Checks obstacles
                if (newValue >= oldValue) {
                    for (let i = oldValue; i <= newValue; i++) {
                        if (map[i][otherCoordValue] == CaseValue.OBSTACLE) {
                            return { valid: false, msg: 'Destination non valide, obstacle sur le chemin' };
                        }
                    }
                } else {
                    for (let i = newValue; i <= oldValue; i++) {
                        if (map[i][otherCoordValue] == CaseValue.OBSTACLE) {
                            return { valid: false, msg: 'Destination non valide, obstacle sur le chemin' };
                        }
                    }
                }
                break;
            case 'y':
                // Checks bounds
                if (newValue > map[0].length || newValue < 0) {
                    return { valid: false, msg: 'Destination non valide, en dehors du terrain' };
                }
                // Checks obstacles
                if (newValue >= oldValue) {
                    for (let i = oldValue; i <= newValue; i++) {
                        if (map[otherCoordValue][i] == CaseValue.OBSTACLE) {
                            return { valid: false, msg: 'Destination non valide, obstacle sur le chemin' };
                        }
                    }
                } else {
                    for (let i = newValue; i <= oldValue; i++) {
                        if (map[otherCoordValue][i] == CaseValue.OBSTACLE) {
                            return { valid: false, msg: 'Destination non valide, obstacle sur le chemin' };
                        }
                    }
                }

                break;
        }

        return { valid: true };
    }
}
