import { Container } from "react-bootstrap";
import InputGridLayout from "./components/InputGridLayout/InputGridLayout";
import { useState, useEffect, useCallback } from "react";
import "./Frontend.scss";
import { GridLayoutProps } from "./models/GridLayoutProps";
import { GridSpot } from "./models/GridSpot";

const Frontend = () => {

    const [registeredGrid, setRegisteredGrid]: any[] = useState([]);
    const [displayGrid, setDisplayGrid]: any[] = useState([]);
    const [step, setStep] = useState<number>(1);

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
                initialGrid[row][col] = {x: Number(row), y: Number(col)};
                cells.push(
                    <span key={row + " - " + col} className="cell">
                        {row + " - " + col}
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
        setStep(2);
    }

    const addMountains = useCallback(() => {
        setShowInputGridLayout(false);
        setShowInputGridMountains(true);
        console.log(displayGrid);
    }, [displayGrid])

    const addTreasures = useCallback(() => {
        setShowInputGridMountains(false);
        setShowInputGridTreasures(true);
        console.log(displayGrid);
    }, [displayGrid])

    const addAdventurer = useCallback(() => {
        setShowInputGridTreasures(false);
        setShowInputGridAdventurer(true);
        console.log(displayGrid);
    }, [displayGrid])

    const addMovements = useCallback(() => {
        setShowInputGridAdventurer(false);
        setShowInputGridMovements(true);
        console.log(displayGrid);
    }, [displayGrid])

    useEffect(() => {
        switch(step) {
            case 2:
                addMountains();
                break;
            case 3:
                addTreasures();
                break;
            case 4:
                addAdventurer();
                break;
            case 5:
                addMovements();
                break;
            default:
                break;
        }
    }, [step, addMountains, addTreasures, addAdventurer, addMovements]);

    return (
        <Container>

            <h2 className="header text-center mb-5">Partez à l'aventure</h2>

            {showInputGridLayout && 
                <InputGridLayout onSubmit={createInitialGrid} />
            }

            {showInputGridMountains &&
                <p>Coucou</p>
            }

            {showInputGridTreasures &&
                <p>Coucou</p>
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
