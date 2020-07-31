import { Direction } from './direction.enum';

export class Terrain {
    name: string;
    height: number;
    width: number;
    obstacles: {
        startX: number;
        startY: number;
        length: number;
        direction: Direction;
    }[];
    trees: {
        x: number;
        y: number;
    }[];
}
