import { Treasure } from './Treasure';

interface GridSpot {
    x?: number;
    y?: number;
    hero?: boolean;
    mountain?: boolean;
    treasure?: Treasure;
}

export type {GridSpot};