import { useState } from "react";
import { Button } from "react-bootstrap";
import useEventCallback from "use-event-callback";
import { GridSpot } from "../../models/GridSpot";

const InputGridAdventurer = (props: any) => {
    const {adventurer, gridRefs, registeredGrid, onSubmit} = props;

    const [showButtons, setShowButtons] = useState<boolean>(false);

    const [enableComp, setEnableComp] = useState<boolean>(true);

    const handleCellClick = useEventCallback((event: React.MouseEvent<HTMLSpanElement>) => {        
        if (!showButtons) {
            setShowButtons(true);

            event.currentTarget.textContent = "😎";

            for (let cell of gridRefs.current) {
                cell.classList.add("pointer-events-none");
            }

            const clickedRow = event.currentTarget.id[0];
            const clickedCol = event.currentTarget.id[2];
            registeredGrid[clickedRow][clickedCol].adventurer = true;
            registeredGrid[clickedRow][clickedCol].visited = [1];
        }   
    });

    if (enableComp) {
        for (let cell of gridRefs.current) {
            cell.addEventListener("click", handleCellClick);        
        }
    }

    const validateAdventurer = () => {
        for (let cell of gridRefs.current) {
            cell.removeEventListener("click", handleCellClick);            
        }

        onSubmit({
            registeredGrid,
            gridRefs
        });

        setEnableComp(false);
    }

    const cancelSelection = () => {
        for (let cell of gridRefs.current) {            
            if (cell.textContent === "😎" || cell.textContent.includes("-")) {
                cell.textContent = cell.id;
                cell.addEventListener("click", handleCellClick);
                cell.classList.remove("pointer-events-none");
            } 
        }

        registeredGrid.map((row: []) => {
            row.map((cell: GridSpot) => {
                cell.adventurer = false;
                cell.visited = [];
                return cell;
            })
            return row;
        })

        setShowButtons(false);
    }

    return (
        <div className="InputGridAdventurer">
            {!enableComp && (
                null
            )}

            {enableComp && (
                <>
                    <h3 className="sub-header text-center mb-5">Nous y sommes presque ! Où souhaitez-vous commencer, {adventurer} ?</h3>

                    {showButtons && (
                        <div className="d-flex justify-content-around mb-5">
                            <Button className="ButtonPrimaryCustom" onClick={validateAdventurer}>
                                Valider
                            </Button>
                            <Button className="ButtonSecondaryCustom" onClick={cancelSelection}>
                                Annuler
                            </Button>
                        </div>
                    )}
                    
                </>
            )}
        </div>
    );

};

export default InputGridAdventurer;
