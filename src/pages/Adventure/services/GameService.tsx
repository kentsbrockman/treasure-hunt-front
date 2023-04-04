import { GridSpot } from "../models/GridSpot";
import { Movement } from "../enums/Movement";
import { Orientation } from "../enums/Orientation";
import { filter2DArray } from "../../../utils/Filter2DArray";
import treasureIcon from "assets/images/treasure-icon.png";

const GameService = () => {

    const processMovementSequence = (finalGrid: GridSpot[][], movementSequence: Movement[], initialOrientation: Orientation, gridRefs: React.MutableRefObject<never[]>) => {

        let orientation: Orientation = initialOrientation;
        let round: number = 1;
        let collectedTreasures = 0;

        const processedGridRefs: any[][] = [];

        for (let i = 0; i < gridRefs.current.length; i += finalGrid[0].length) {
            processedGridRefs.push(gridRefs.current.slice(i, i + finalGrid[0].length));
        }

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
                

                if (newPosition !== undefined && newPosition.mountain === false) {
                    finalGrid[Number(currentPosition.x)][Number(currentPosition.y)].adventurer = false;
                    finalGrid[Number(newPosition.x)][Number(newPosition.y)].adventurer = true;
                    finalGrid[Number(newPosition.x)][Number(newPosition.y)].visited?.push(round);
                
                    if (newPosition.treasure && newPosition.treasure > 0) {
                        finalGrid[Number(newPosition.x)][Number(newPosition.y)].adventurer = true;

                        collectedTreasures += 1;

                        const currentTreasureCount: any = finalGrid[Number(newPosition.x)][Number(newPosition.y)].treasure;

                        finalGrid[Number(newPosition.x)][Number(newPosition.y)].treasure = currentTreasureCount - 1;

                        const nextCell: HTMLElement = processedGridRefs[Number(newPosition.x)][Number(newPosition.y)];

                        nextCell.textContent = "";
                        const treasureImg = document.createElement("img");
                        treasureImg.src = treasureIcon;
                        treasureImg.style.width = "40px";
                        treasureImg.style.height = "40px";
                        nextCell.appendChild(treasureImg);
                        const nbChests = document.createElement("p");
                        nbChests.textContent = "Nombre de coffres : " + (currentTreasureCount - 1);
                        nextCell.appendChild(nbChests);
                        nextCell.classList.add("treasure-spot");
                    }
                }
            }

            const currentPosition: GridSpot = filter2DArray(finalGrid, "adventurer", true)[0];
            const currentCell: HTMLElement = processedGridRefs[Number(currentPosition.x)][Number(currentPosition.y)];
            const anotationRound = document.createElement("p");
            anotationRound.classList.add("font-size-medium");
            anotationRound.textContent += "Tour " + (round - 1);
            currentCell.appendChild(anotationRound);
        }

        const finalPosition: GridSpot = filter2DArray(finalGrid, "adventurer", true)[0];
        const finalCell: HTMLElement = processedGridRefs[Number(finalPosition.x)][Number(finalPosition.y)];
        finalCell.classList.add("font-size-large");
        finalCell.textContent += " 😎";


        return {finalGrid, collectedTreasures};
    }

    return {
        processMovementSequence
    };
}

export default GameService;