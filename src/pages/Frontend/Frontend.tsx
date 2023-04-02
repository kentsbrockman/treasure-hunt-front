import { Container } from "react-bootstrap";
import InputGridLayout from "./components/InputGridLayout/InputGridLayout";
import InputGridMountains from "./components/InputGridMountains/InputGridMountains";
import InputGridTreasures from "./components/InputGridTreasures/InputGridTreasures";
import { useState, useEffect, useRef } from "react";
import "./Frontend.scss";
import { GridLayoutProps } from "./models/GridLayoutProps";
import { GridSpot } from "./models/GridSpot";
import { Stepper } from "react-form-stepper";
import { ConsolidatedGrid } from './models/ConsolidatedGrid';

const Frontend = () => {
    
    const [registeredGrid, setRegisteredGrid]: any[] = useState([]);
    const [displayGrid, setDisplayGrid]: any[] = useState([]);
    let gridRefs = useRef([]);

    const [step, setStep] = useState<number>(0);

    const [showInputGridLayout, setShowInputGridLayout] = useState<boolean>(true);
    const [showInputGridMountains, setShowInputGridMountains] = useState<boolean>(false);
    const [showInputGridTreasures, setShowInputGridTreasures] = useState<boolean>(false);
    const [showInputGridAdventurer, setShowInputGridAdventurer] = useState<boolean>(false);
    const [showInputGridMovements, setShowInputGridMovements] = useState<boolean>(false);

    const createInitialGrid = (gridLayout: GridLayoutProps) => {
        const initialGrid: GridSpot[][] = new Array(gridLayout.nbRows).fill(undefined);
        const displayGrid = [];

        for (let row in initialGrid) {            
            initialGrid[row] = new Array(gridLayout.nbColumns).fill(undefined);
            const cells = [];

            for (let col in initialGrid[row]) {
                initialGrid[row][col] = {x: Number(row), y: Number(col), hero: false, mountain: false, treasure: {present: false, count: 0}};
                cells.push(
                    <span
                        id={row + "-" + col}
                        key={row + "-" + col}
                        // eslint-disable-next-line
                        ref={(elem: never) => gridRefs.current.push(elem)}
                        className="cell"
                    >
                        {row + "-" + col}
                    </span>
                );
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
                break;
            default:
                break;
        }
    }, [step]);

    const updateGrid = (updatedGrid: ConsolidatedGrid) => { 
        console.log(updatedGrid);
        
        gridRefs = updatedGrid.updatedGridRefs;
        setRegisteredGrid(updatedGrid.registeredGrid);
        setStep(step + 1);
    }

    return (
        <Container>
            <h2 className="header text-center mb-5">Partez à l'aventure</h2>

            <Stepper
                steps={[{}, {}, {}, {}]}
                activeStep={step}
                className="mb-5"
            />

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
                <p>Coucou</p>
            }

            {showInputGridMovements &&
                <p>Coucou</p>
            }

            {displayGrid}

        </Container>
    );

};

export default Frontend;
