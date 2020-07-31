import { Direction } from '../../shared/models/direction.enum';
import { Terrain } from '../../shared/models/terrain.model';

export const terrain1: Terrain = {
    name: 'Terrain 1',
    height: 30,
    width: 50,
    obstacles: [
        {
            startX: 10,
            startY: 10,
            length: 3,
            direction: Direction.RIGHT,
        },
        {
            startX: 5,
            startY: 2,
            length: 4,
            direction: Direction.DOWN,
        },
        {
            startX: 12,
            startY: 25,
            length: 8,
            direction: Direction.UP,
        },
        {
            startX: 28,
            startY: 14,
            length: 7,
            direction: Direction.LEFT,
        },
    ],
    trees: [
        {
            x: 4,
            y: 1,
        },
        {
            x: 4,
            y: 5,
        },
        {
            x: 12,
            y: 5,
        },
        {
            x: 21,
            y: 8,
        },
        {
            x: 29,
            y: 8,
        },
        {
            x: 7,
            y: 24,
        },
        {
            x: 16,
            y: 19,
        },
        {
            x: 27,
            y: 23,
        },
    ],
};
