import { FormEvent, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

const InputGridLayout = ({ onSubmit }: any) => {

    const [nbColumns, setNbColumns] = useState<number>(3);
    const minCols: number = 3;
    const maxCols: number = 9;

    const [nbRows, setNbRows] = useState<number>(3);
    const minRows: number = 3;
    const maxRows: number = 9;

    const validateGridLayout = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
            nbColumns,
            nbRows
        });
    }

    return (

        <>
            <h3 className="sub-header text-center mb-5">Commençons par construire la carte aux trésors</h3>

            <Form className="margin-left-5 margin-right-5" onSubmit={validateGridLayout}>
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
                
            </Form>

        </>
        

    );

};

export default InputGridLayout;