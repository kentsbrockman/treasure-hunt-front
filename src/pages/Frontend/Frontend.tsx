import { Container } from "react-bootstrap";
import InputGridLayout from './components/InputGridLayout/InputGridLayout';
import { useState, useEffect, useCallback } from 'react';
import "./Frontend.scss";
import GridLayoutProps from './models/GridLayoutProps';

const Frontend = () => {

    const [registeredGrid, setRegisteredGrid]: any[] = useState([]);
    const [displayGrid, setDisplayGrid]: any[] = useState([]);
    const [step, setStep] = useState<number>(1);

    const [showInputGridLayout, setShowInputGridLayout] = useState<boolean>(true);
    const [showInputGridMountains, setShowInputGridMountains] = useState<boolean>(false);
    const [showInputGridTreasures, setShowInputGridTreasures] = useState<boolean>(false);
    const [showInputGridAdventurer, setShowInputGridAdventurer] = useState<boolean>(false);

    const createInitialGrid = (newGrid: GridLayoutProps) => {
        const initialGrid = new Array(newGrid.nbRows).fill(undefined);

        const displayGrid = [];

        for (let row in initialGrid) {            
            initialGrid[row] = new Array(newGrid.nbColumns).fill(undefined);
            const cells = [];

            for (let col in initialGrid[row]) {
                initialGrid[row][col] = {x: row, y: col};
                cells.push(<span key={row.toString() + " - " + col.toString()} className="cell">{row.toString() + " - " + col.toString()}</span>);
            }

            displayGrid.push(<div key={"Ligne " + row.toString()} className="d-flex justify-content-center">{cells}</div>);
        }

        setRegisteredGrid(initialGrid);
        setDisplayGrid(displayGrid);
        setStep(2);
    }

    const addMountains = useCallback(() => {
        console.log(displayGrid);
    }, [displayGrid])

    const addTreasures = useCallback(() => {
        console.log(displayGrid);
    }, [displayGrid])

    const addAdventurer = useCallback(() => {
        console.log(displayGrid);
    }, [displayGrid])

    useEffect(() => {
        if (step === 2) {
            setShowInputGridLayout(false);
            setShowInputGridMountains(true);
            addMountains();
        }

        if (step === 3) {
            setShowInputGridMountains(false);
            setShowInputGridTreasures(true);
            addTreasures();
        }

        if (step === 4) {
            setShowInputGridTreasures(false);
            setShowInputGridAdventurer(true);
            addAdventurer();
        }

        if (step === 5) {
            setShowInputGridAdventurer(false);
        }

    }, [step, addMountains, addTreasures, addAdventurer]);

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

            {displayGrid}

        </Container>
    );

};

export default Frontend;
