export class TerrainObj {
    name: string;
    height: number;
    width: number;
    obstacles: [
        {
            x: number;
            y: number;
        },
    ];
    trees: [
        {
            x: number;
            y: number;
        },
    ];
}
