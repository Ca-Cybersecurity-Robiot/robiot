import { Direction } from './direction.enum';

export class Terrain {
    name: string;
    height: number;
    width: number;
    obstacles: {
        start_x: number;
        start_y: number;
        length: number;
        direction: Direction;
    }[];
    trees: {
        x: number;
        y: number;
    }[];
}
