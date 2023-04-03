import { FormEvent, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Movement } from "../../enums/Movement";
import { BsFillArrowLeftSquareFill, BsFillArrowUpSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";

const InputMovements = (props: any) => {

    const {gridRefs, initialOrientation, onSubmit} = props;

    const [movementSequence, setMovementSequence] = useState<Movement[]>([]);
    const maxMovements: number = Number(gridRefs.current.length);

    const [enableComp, setEnableComp] = useState<boolean>(true);

    const updateMovementSequence = (movement: Movement) => {
        if (movementSequence.length === maxMovements) {
            alert("Vous ne pouvez pas ajouter plus de mouvements à la séquence. Veuillez valider ou annuler votre sélection.")
            return;
        }

        setMovementSequence([...movementSequence, movement]);
    }

    const validateMovementSequence = (e: FormEvent<HTMLFormElement>) => {
        setEnableComp(false);

        e.preventDefault();
        onSubmit(movementSequence);
    }

    return (
        <div className="InputMovements">
            {!enableComp && (
                null
            )}

            {enableComp && (
                <>
                    <h3 className="sub-header text-center mb-3">Let's go !</h3>

                    <h3 className="sub-header text-center mb-3">Saisissez maintenant la séquence de mouvements à réaliser pour récupérer un maximum de trésors</h3>

                    <p className="text-center text-muted mb-5 fst-italic">Pour cette partie, vous débutez en étant orienté {initialOrientation}</p>

                    <p className="text-center mb-5 fw-bold color-primary">Veuillez saisir jusqu'à {maxMovements} mouvements</p>

                    <div className="d-flex justify-content-around mb-5"> 
                        <BsFillArrowLeftSquareFill size={50} color="#0741ad" className="cursor-pointer custom-hover-icon" onClick={() => updateMovementSequence(Movement.Left)} />

                        <BsFillArrowUpSquareFill size={50} color="#0741ad" className="cursor-pointer custom-hover-icon" onClick={() => updateMovementSequence(Movement.Forward)} />

                        <BsFillArrowRightSquareFill size={50} color="#0741ad" className="cursor-pointer custom-hover-icon" onClick={() => updateMovementSequence(Movement.Right)} />               
                    </div>

                    <Form className="d-flex justify-content-center mb-5" onSubmit={validateMovementSequence}>
                        <Col>
                            <Form.Group className="mb-5">
                                <Form.Control
                                    value={movementSequence.join(", ")}
                                    placeholder="Séquence de mouvements"
                                    aria-label="Display chosen movement sequence"
                                    readOnly 
                                />
                            </Form.Group>                    

                            {movementSequence.length > 0 && (
                                <div className="d-flex justify-content-around">
                                    <Button className="ButtonPrimaryCustom w-10" type="submit">
                                        Valider
                                    </Button>
                                    <Button className="ButtonSecondaryCustom w-10" onClick={() => setMovementSequence([])}>
                                        Annuler
                                    </Button>
                                </div>
                            )}
                        </Col>

                    </Form>
                </>
            )}
        </div>
    );
};

export default InputMovements;
