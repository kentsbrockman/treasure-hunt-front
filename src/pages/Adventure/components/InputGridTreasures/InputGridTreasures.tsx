import { useState } from "react";
import { Button } from "react-bootstrap";
import useEventCallback from "use-event-callback";
import { GridSpot } from "../../models/GridSpot";
import treasureIcon from "assets/images/treasure-icon.png";

const InputGridTreasures = (props: any) => {
    const {gridRefs, registeredGrid, onSubmit} = props;

    const [treasureCount, setTreasureCount] = useState<number>(0);
    const maxTreasures: number = Math.floor(Number(gridRefs.current.length) / 5);
    const treasureIconSize = "40px";
    const treasureString: string = maxTreasures > 1 ? "trésors" : "trésor"

    const [showButtons, setShowButtons] = useState<boolean>(false);

    const [enableComp, setEnableComp] = useState<boolean>(true);

    const handleCellClick = useEventCallback((event: React.MouseEvent<HTMLSpanElement>) => {        
        if (!showButtons) {
            setShowButtons(true);
        }

        if (treasureCount < maxTreasures) {

            const nbTreasures: string | null = prompt("Combien de coffres souhaitez-vous placer ici ?")

            if (Number(nbTreasures)) {
                const treasureImg = document.createElement("img");
                treasureImg.src = treasureIcon;
                treasureImg.style.width = treasureIconSize;
                treasureImg.style.height = treasureIconSize;
                event.currentTarget.textContent = "";
                event.currentTarget.appendChild(treasureImg);

                const nbChests = document.createElement("p");
                nbChests.textContent = "Nombre de coffres : " + nbTreasures;
                event.currentTarget.appendChild(nbChests);
                event.currentTarget.classList.add("treasure-spot");

                const clickedRow = event.currentTarget.id[0];
                const clickedCol = event.currentTarget.id[2];
                registeredGrid[clickedRow][clickedCol].treasure = {present: true, count: Number(nbTreasures)};
                setTreasureCount(treasureCount + 1);
            } else {
                alert("La saisie du nombre de trésors est invalide. Veuillez réessayer")
            }
        } else {
            alert("Vous ne pouvez pas ajouter plus de trésors, veuillez valider ou annuler votre sélection");
        }
    });

    if (enableComp) {
        for (let cell of gridRefs.current) {
            cell.addEventListener("click", handleCellClick);        
        }
    }

    const validateTreasures = () => {
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
            if (cell.getElementsByTagName("img").length > 0) {
                cell.getElementsByTagName("img")[0].remove();
                cell.textContent = cell.id;
                cell.addEventListener("click", handleCellClick);
                cell.classList.remove("pointer-events-none");
            } 
        }

        registeredGrid.map((row: []) => {
            row.map((cell: GridSpot) => {
                cell.treasure = {present: false, count: 0};
                return cell;
            })
            return row;
        })

        setTreasureCount(0);
        setShowButtons(false);
    }

    return (
        <div className="InputGridTreasures">
            {!enableComp && (
                null
            )}

            {enableComp && (
                <>
                    <h3 className="sub-header text-center mb-5">Super, plaçons maintenant les trésors !</h3>

                    <p className="text-center mb-5 fw-bold color-primary">Veuillez placer jusqu'à {maxTreasures} {treasureString} sur la carte</p>

                    {showButtons && (
                        <div className="d-flex justify-content-around mb-5">
                            <Button className="ButtonPrimaryCustom" onClick={validateTreasures}>
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

export default InputGridTreasures;
