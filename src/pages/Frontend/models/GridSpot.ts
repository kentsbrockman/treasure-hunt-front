import { Treasure } from './Treasure';

interface GridSpot {
    x?: number;
    y?: number;
    adventurer?: boolean;
    mountain?: boolean;
    treasure?: Treasure;
}

export type {GridSpot};