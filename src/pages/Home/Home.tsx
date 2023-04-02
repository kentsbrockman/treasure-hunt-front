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
        if (usernameRef.current.value === "Easter Egg") {
            alert("GG si tu l'as vu sans être allé dans le code 😎");
        }
        e.preventDefault();
        setAdventurer(usernameRef.current.value);
    }

    return (

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
                                        <Button className="ButtonPrimaryCustom" size="sm">
                                            Démarrer l'expérience en Frontend
                                        </Button>
                                    </NavLink>
                                    <NavLink
                                        to="/backend"
                                    >
                                        <Button className="ButtonSecondaryCustom" size="sm">
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

                            <Form className="margin-right-1-25" onSubmit={saveUsername}>
                                <Form.Group className="mb-5">
                                    <Form.Control
                                        ref={usernameRef}
                                        type="text"
                                        pattern="\w{3,24}"
                                        title="Votre nom d'utilisateur doit être composé de 3 à 24 caractères."
                                        placeholder="Nathan Drake, Lara Croft, Indiana Jones..." />
                                </Form.Group>

                                <Button className="ButtonPrimaryCustom" type="submit">
                                    Enregistrer
                                </Button>
                            </Form>
                        </>
                    )}
                </Col>
            </Row>
        </Container>

    );

};

export default Home;
