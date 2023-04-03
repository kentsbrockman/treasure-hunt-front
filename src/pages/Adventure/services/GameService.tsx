import { GridSpot } from "../models/GridSpot";
import { Movement } from "../enums/Movement";
import { Orientation } from "../enums/Orientation";
import { filter2DArray } from "../../../utils/Filter2DArray";

const GameService = () => {

    const processMovementSequence = (finalGrid: GridSpot[][], movementSequence: Movement[], initialOrientation: Orientation) => {

        let orientation: Orientation = initialOrientation;
        let round: number = 0;
        let collectedTreasures = 0;

        for (let movement of movementSequence) {
            round += 1;

            if (movement === Movement.Left) {
                switch(orientation) {
                    case Orientation.North:
                        orientation = Orientation.West
                        break;
                    case Orientation.South:
                        orientation = Orientation.East
                        break;
                    case Orientation.East:
                        orientation = Orientation.North
                        break;
                    case Orientation.West:
                        orientation = Orientation.South
                        break;
                    default:
                        break;
                }
            }

            if (movement === Movement.Right) {
                switch(orientation) {
                    case Orientation.North:
                        orientation = Orientation.East
                        break;
                    case Orientation.South:
                        orientation = Orientation.West
                        break;
                    case Orientation.East:
                        orientation = Orientation.South
                        break;
                    case Orientation.West:
                        orientation = Orientation.North
                        break;
                    default:
                        break;
                }
            }

            if (movement === Movement.Forward) {
                const currentPosition: GridSpot = filter2DArray(finalGrid, "adventurer", true)[0];
                let newPosition: GridSpot = {};

                if (currentPosition !== undefined) {
                    if (orientation === Orientation.North) {
                        newPosition = filter2DArray(finalGrid, "x", (Number(currentPosition.x) - 1)).filter(position => position.y === currentPosition.y)[0];
                    }
    
                    if (orientation === Orientation.South) {
                        newPosition = filter2DArray(finalGrid, "x", (Number(currentPosition.x) + 1)).filter(position => position.y === currentPosition.y)[0];                  
                    }
    
                    if (orientation === Orientation.East) {
                        newPosition = filter2DArray(finalGrid, "y", (Number(currentPosition.y) + 1)).filter(position => position.x === currentPosition.x)[0];                    
                    }
    
                    if (orientation === Orientation.West) {
                        newPosition = filter2DArray(finalGrid, "y", (Number(currentPosition.y) - 1)).filter(position => position.x === currentPosition.x)[0];
                    }
                }

                if (newPosition !== undefined && newPosition.mountain === false) {
                    finalGrid[Number(currentPosition.x)][Number(currentPosition.y)].adventurer = false;
                    finalGrid[Number(newPosition.x)][Number(newPosition.y)].adventurer = true;
                    finalGrid[Number(newPosition.x)][Number(newPosition.y)].visited?.push(round + 1);

                    if (newPosition.treasure && newPosition.treasure > 0) {
                        finalGrid[Number(newPosition.x)][Number(newPosition.y)].adventurer = true;

                        collectedTreasures += 1;

                        const currentTreasureCount: any = finalGrid[Number(newPosition.x)][Number(newPosition.y)].treasure;

                        finalGrid[Number(newPosition.x)][Number(newPosition.y)].treasure = currentTreasureCount - 1;
                    }
                }
            }
            
        }

        return {finalGrid, collectedTreasures};
    }

    const displayFinalGrid = () => {
        // TODO - Animation grille
    }

    return {
        processMovementSequence,
        displayFinalGrid
    };
}

export default GameService;