// @ts-ignore
import Fade from "react-reveal/Fade";

import { Container } from "react-bootstrap";
import "./Backend.scss";

const Backend = () => {

    return (
        <Fade
            left
            duration={1000}
            delay={500}
            distance="30px"
        >
            <Container>
                <h1>BACKEND</h1>
            </Container>
      </Fade>
    );

};

export default Backend;
