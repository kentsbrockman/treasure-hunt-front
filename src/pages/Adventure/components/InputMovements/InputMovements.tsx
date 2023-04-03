import { FormEvent, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

const InputMovements = (props: any) => {

    const {gridRefs, initialOrientation, onSubmit} = props;

    const [movementCount, setMovementCount] = useState<number>(0);
    const maxMovements: number = 9
    //Number(gridRefs.current.length);

    const validateGridLayout = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
            
        });
    }

    return (

        <>
            <h3 className="sub-header text-center mb-3">Let's go !</h3>

            <h3 className="sub-header text-center mb-3">Saisissez la séquence de mouvements à réaliser pour récupérer un maximum de trésors</h3>

            <p className="text-center text-muted mb-5 fst-italic">Pour cette partie, vous débutez en étant orienté {initialOrientation}</p>

            <p className="text-center mb-5 fw-bold color-primary">Veuillez saisir jusqu'à {maxMovements} mouvements</p>

            <div className="d-flex justify-content-around">
                <Button className="ButtonSuccessCustom w-10" size="sm" type="submit">
                    Tourner à gauche
                </Button>                
                <Button className="ButtonSuccessCustom w-10" size="sm" type="submit">
                    Avancer
                </Button>
                <Button className="ButtonSuccessCustom w-10" size="sm" type="submit">
                    Tourner à droite
                </Button>
            </div>



            {/* <Form className="margin-left-5 margin-right-5" onSubmit={validateGridLayout}>
                <Form.Group className="mb-3" as={Row}>
                    <Col sm={4}>
                        <Form.Label className="fw-bold">Nombre de colonnes</Form.Label>
                    </Col>
                    <Col sm={8}>                
                        <RangeSlider
                            value={nbColumns}
                            onChange={e => setNbColumns(parseInt(e.target.value))}
                            min={minCols}
                            max={maxCols}
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-5" as={Row}>
                    <Col sm={4}>
                        <Form.Label className="fw-bold">Nombre de lignes</Form.Label>
                    </Col>
                    <Col sm={8}>                
                        <RangeSlider
                            value={nbRows}
                            onChange={e => setNbRows(parseInt(e.target.value))}
                            min={minRows}
                            max={maxRows}
                        />
                    </Col>
                </Form.Group>

                    

                <div className="d-flex justify-content-center">
                    <Button className="ButtonPrimaryCustom w-10" size="lg" type="submit">
                        Valider
                    </Button>
                </div>
                
            </Form> */}
        </>
    );
};

export default InputMovements;
