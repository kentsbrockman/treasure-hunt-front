// @ts-ignore
import Fade from "react-reveal/Fade";

import { Container } from "react-bootstrap";
import "./Frontend.scss";

const Frontend = () => {

    return (
        <Fade
            left
            duration={1000}
            delay={500}
            distance="30px"
        >
            <Container>
                <h1>FRONTEND</h1>
            </Container>
      </Fade>
    );

};

export default Frontend;
