// @ts-ignore
import Fade from "react-reveal/Fade";
import { useRef, FormEvent } from 'react';
import { useSessionStorage } from 'usehooks-ts'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LottieAnimation from "assets/animations/lottie";
import jumbotronlanding from "assets/animations/jumbotronlanding.json";
import "./Home.scss";
import { NavLink } from "react-router-dom";

const Home = () => {

    const usernameRef: any = useRef<HTMLInputElement>();
    const [adventurer, setAdventurer] = useSessionStorage("TREASURE_HUNT_REGISTERED_ADVENTURER", "")

    const saveUsername = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAdventurer(usernameRef.current.value);
    }

    return (

        <Fade
            left
            duration={1000}
            delay={500}
            distance="30px"
        >
            <Container fluid>
                <Row>
                    <Col>
                        <LottieAnimation lotti={jumbotronlanding} width={400} height={400} />
                    </Col>

                    <Col>
                        {adventurer && (
                            <div className="adventurer-container">
                                <div className="w-100">
                                    <h2 className="landing-header text-center mb-5">Bienvenue {adventurer}</h2>
                                    <div className="d-flex justify-content-around">
                                        <NavLink
                                            to="/frontend"
                                        >
                                            <Button variant="primary" size="sm">
                                                Démarrer l'expérience en Frontend
                                            </Button>
                                        </NavLink>
                                        <NavLink
                                            to="/backend"
                                        >
                                            <Button variant="success" size="sm">
                                                Démarrer l'expérience en Backend
                                            </Button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!adventurer && (
                            <>
                                <h2 className="landing-header">Bienvenue aventurier !</h2>
                                <h3 className="landing-cta">Veuillez saisir votre nom ci-dessous</h3>

                                <Form onSubmit={saveUsername}>
                                    <Form.Group className="mb-3">
                                        <Form.Control ref={usernameRef} type="text" placeholder="Nathan Drake, Lara Croft, Indiana Jones..." />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Enregistrer
                                    </Button>
                                </Form>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>

        </Fade>
    );

};

export default Home;
