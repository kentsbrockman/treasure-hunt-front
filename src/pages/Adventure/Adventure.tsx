import { Container } from "react-bootstrap";
import InputGridLayout from "./components/InputGridLayout/InputGridLayout";
import InputGridMountains from "./components/InputGridMountains/InputGridMountains";
import InputGridTreasures from "./components/InputGridTreasures/InputGridTreasures";
import InputGridAdventurer from "./components/InputGridAdventurer/InputGridAdventurer";
import InputMovements from "./components/InputMovements/InputMovements";
import { useState, useEffect, useRef } from "react";
import "./Adventure.scss";
import { GridLayoutProps } from "./models/GridLayoutProps";
import { GridSpot } from "./models/GridSpot";
import { Stepper } from "react-form-stepper";
import { ConsolidatedGrid } from "./models/ConsolidatedGrid";
import { Orientation } from "./enums/Orientation";
import { RandomEnum } from "../../utils/RandomEnum";


const Adventure = () => {
    
    const [registeredGrid, setRegisteredGrid]: any[] = useState([]);
    const [displayGrid, setDisplayGrid]: any[] = useState([]);
    let gridRefs = useRef([]);

    const [step, setStep] = useState<number>(0);
    const [showStepper, setShowStepper] = useState<boolean>(true);

    const [showInputGridLayout, setShowInputGridLayout] = useState<boolean>(true);
    const [showInputGridMountains, setShowInputGridMountains] = useState<boolean>(false);
    const [showInputGridTreasures, setShowInputGridTreasures] = useState<boolean>(false);
    const [showInputGridAdventurer, setShowInputGridAdventurer] = useState<boolean>(false);
    const [showInputGridMovements, setShowInputGridMovements] = useState<boolean>(false);

    const [orientation, setOrientation] = useState<Orientation>(RandomEnum(Orientation));    

    const createInitialGrid = (gridLayout: GridLayoutProps) => {
        const initialGrid: GridSpot[][] = new Array(gridLayout.nbRows).fill(undefined);
        const displayGrid = [];

        for (let row in initialGrid) {            
            initialGrid[row] = new Array(gridLayout.nbColumns).fill(undefined);

            let cells = [];

            for (let col in initialGrid[row]) {
                initialGrid[row][col] = {x: Number(row), y: Number(col), adventurer: false, mountain: false, treasure: {present: false, count: 0}};
                cells = createCells(row, col, cells); 
            }

            displayGrid.push(
                <div key={"Ligne " + row} className="d-flex justify-content-center">
                    {cells}
                </div>
            );
        }

        setRegisteredGrid(initialGrid);
        setDisplayGrid(displayGrid);
        setStep(step + 1);
    }

    const createCells = (row: string, col: string, cells: any[]) => {
        cells.push(
            <span
                id={row + "-" + col}
                key={row + "-" + col}
                ref={(elem: never) => gridRefs.current.push(elem)}
                className="cell"
            >
                {row + "-" + col}
            </span>
        );

        return cells;
    }

    useEffect(() => {
        switch(step) {
            case 1:
                setShowInputGridLayout(false);
                setShowInputGridMountains(true);
                break;
            case 2:
                setShowInputGridMountains(false);
                setShowInputGridTreasures(true);
                break;
            case 3:
                setShowInputGridTreasures(false);
                setShowInputGridAdventurer(true);
                break;
            case 4:
                setShowInputGridAdventurer(false);
                setShowInputGridMovements(true);
                setShowStepper(false);
                break;
            default:
                break;
        }
    }, [step]);

    const updateGrid = (updatedGrid: ConsolidatedGrid) => {        
        gridRefs = updatedGrid.updatedGridRefs;
        setRegisteredGrid(updatedGrid.registeredGrid);
        setStep(step + 1);
    }

    const registerMovementSequence = (movementSequence: any) => {        
        console.log(movementSequence);
    }

    return (
        <Container className="Adventure">
            {/* <h2 className="header text-center mb-5">Partez à l'aventure</h2> */}

            <InputMovements gridRefs={gridRefs} initialOrientation={orientation} onSubmit={registerMovementSequence} />

            {showStepper && 
                <Stepper
                    steps={[{}, {}, {}, {}]}
                    activeStep={step}
                    className="mb-5"
                    connectorStateColors
                    connectorStyleConfig={{
                        activeColor: "#0741ad",
                        completedColor: "#042563"
                    }}
                />
            }

            {showInputGridLayout &&
                <InputGridLayout onSubmit={createInitialGrid} />
            }

            {showInputGridMountains &&
                <InputGridMountains gridRefs={gridRefs} registeredGrid={registeredGrid} onSubmit={updateGrid} />
            }

            {showInputGridTreasures &&
                <InputGridTreasures gridRefs={gridRefs} registeredGrid={registeredGrid} onSubmit={updateGrid} />
            }

            {showInputGridAdventurer &&
                <InputGridAdventurer gridRefs={gridRefs} registeredGrid={registeredGrid} onSubmit={updateGrid} />
            }

            {showInputGridMovements &&
                <InputMovements gridRefs={gridRefs} initialOrientation={orientation} onSubmit={registerMovementSequence} />
            }

            {displayGrid}

        </Container>
    );

};

export default Adventure;
