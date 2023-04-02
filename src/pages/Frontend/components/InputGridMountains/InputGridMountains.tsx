import { useState } from "react";
import { Button } from "react-bootstrap";
import useEventCallback from "use-event-callback";
import { GridSpot } from '../../models/GridSpot';

const InputGridMountains = (props: any) => {
    const {gridRefs, registeredGrid, onSubmit} = props;

    const [mountainCount, setMountainCount] = useState<number>(0);
    const maxMountains: number = Math.floor(Number(gridRefs.current.length) / 4);
    const mountains: string[] = ["⛰️", "🚞", "🌄"];

    const [showButtons, setShowButtons] = useState<boolean>(false);

    const handleCellClick = useEventCallback((event: React.MouseEvent<HTMLSpanElement>) => {        
        if (!showButtons) {
            setShowButtons(true);
        }

        if (mountainCount < maxMountains) {
            const clickedRow = event.currentTarget.id[0];
            const clickedCol = event.currentTarget.id[2];
            const randomIndex = Math.floor(Math.random() * mountains.length);
            const randomMountain = mountains[randomIndex];
            event.currentTarget.textContent = randomMountain;
            event.currentTarget.classList.add("pointer-events-none");
            registeredGrid[clickedRow][clickedCol].mountain = true;
            setMountainCount(mountainCount + 1);
        } else {
            window.alert("Vous ne pouvez pas ajouter plus de montagnes, veuillez valider ou annuler votre sélection");
        }
    });

    for (let cell of gridRefs.current) {
        cell.addEventListener("click", handleCellClick);        
    }

    const validateMountains = () => {
        onSubmit({
            registeredGrid
        });
    }

    const cancelSelection = () => {
        for (let cell of gridRefs.current) {
            cell.textContent = cell.id;
            cell.addEventListener("click", handleCellClick);
            cell.classList.remove("pointer-events-none");   
        }

        registeredGrid.map((row: []) => {
            row.map((cell: GridSpot) => {
                cell.mountain = false;
                return cell;
            })
            return row;
        })

        setMountainCount(0);
        setShowButtons(false);
    }

    return (
        <>
            <h3 className="sub-header text-center mb-4">Maintenant, ajoutons les montagnes sur la carte</h3>

            <p className="text-center text-muted mb-5 fst-italic">La règle stipule que les aventuriers ne pourront pas se déplacer dans les endroits montagneux</p>

            <p className="text-center mb-5 fw-bold color-primary">Veuillez sélectionner jusqu'à {maxMountains} montagnes</p>

            {showButtons && (
                <div className="d-flex justify-content-around mb-5">
                    <Button className="ButtonPrimaryCustom" onClick={validateMountains} type="submit">
                        Valider
                    </Button>
                    <Button className="ButtonSecondaryCustom" onClick={cancelSelection}>
                        Annuler
                    </Button>
                </div>
            )}
            
        </>
    );

};

export default InputGridMountains;
