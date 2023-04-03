import { GridSpot } from "./GridSpot";

interface ConsolidatedGrid {
    registeredGrid: GridSpot[][],
    updatedGridRefs: any
}

export type {ConsolidatedGrid};