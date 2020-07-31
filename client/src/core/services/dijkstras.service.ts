import { Injectable } from '@angular/core';
import { CaseValue } from '../../shared/models/case-value.model';
import { Position } from '../../shared/models/position.model';

@Injectable({
    providedIn: 'root',
})
export class DijkstrasService {
    useDijkstrasAlgorithm(
        map: Array<Array<string>>,
        position: Position,
        treesToCheck: Position[],
    ): { map: Array<Array<{ distance: number; terrain: string }>>; report: string } {
        let trees = treesToCheck;
        let newMap;
        let report = '';

        // Iterates as long as there are trees left to check+
        while (trees.length > 0) {
            report += 'Starting from position x : ' + position.x + ' y : ' + position.y + '<br>';
            newMap = this.initiateMap(map, position);

            // Fill the map according to Dijkstras algorithm
            this.fillEveryDirection(newMap, position, 1);
            // Find closest tree
            let closestTree = trees[0];
            for (const tree of trees) {
                if (newMap[tree.x][tree.y].distance < newMap[closestTree.x][closestTree.y]) {
                    closestTree = tree;
                }
            }

            report += 'Moving to tree at position x : ' + closestTree.x + ' y : ' + closestTree.y + '<br>';
            position = { x: closestTree.x, y: closestTree.y };
            trees = trees.filter((tree) => tree.x != closestTree.x || tree.y != closestTree.y);
        }

        report += 'No more tree to check, going back to base.';

        return { map: newMap, report: report };
    }

    // Fills the map object with value indicating the distance from the initial position
    fillEveryDirection(
        map: Array<Array<{ terrain: string; distance: number }>>,
        position: Position,
        turn: number,
    ): void {
        // Left
        if (
            position.x - 1 >= 0 &&
            map[position.x - 1][position.y].terrain != CaseValue.OBSTACLE &&
            (map[position.x - 1][position.y].distance == null || map[position.x - 1][position.y].distance > turn)
        ) {
            map[position.x - 1][position.y].distance = turn;
            this.fillEveryDirection(map, { x: position.x - 1, y: position.y }, turn + 1);
        }

        // Right
        if (
            position.x + 1 < map.length &&
            map[position.x + 1][position.y].terrain != CaseValue.OBSTACLE &&
            (map[position.x + 1][position.y].distance == null || map[position.x + 1][position.y].distance > turn)
        ) {
            map[position.x + 1][position.y].distance = turn;
            this.fillEveryDirection(map, { x: position.x + 1, y: position.y }, turn + 1);
        }

        // Up
        if (
            position.y - 1 >= 0 &&
            map[position.x][position.y - 1].terrain != CaseValue.OBSTACLE &&
            (map[position.x][position.y - 1].distance == null || map[position.x][position.y - 1].distance > turn)
        ) {
            map[position.x][position.y - 1].distance = turn;
            this.fillEveryDirection(map, { x: position.x, y: position.y - 1 }, turn + 1);
        }

        // Down
        if (
            position.y + 1 < map[0].length &&
            map[position.x][position.y + 1].terrain != CaseValue.OBSTACLE &&
            (map[position.x][position.y + 1].distance == null || map[position.x][position.y + 1].distance > turn)
        ) {
            map[position.x][position.y + 1].distance = turn;
            this.fillEveryDirection(map, { x: position.x, y: position.y + 1 }, turn + 1);
        }
    }

    private initiateMap(map: Array<Array<string>>, position): Array<Array<{ terrain: string; distance: number }>> {
        const newMap = Array.from({ length: map.length }, () => Array.from({ length: map[0].length }, () => null));

        // Fills the map
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                newMap[i][j] = { distance: null, terrain: map[i][j] };
            }
        }
        newMap[position.x][position.y].distance = 0;

        return newMap;
    }
}
