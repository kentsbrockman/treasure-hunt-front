// @ts-ignore
import Fade from "react-reveal/Fade";

import { Container } from "react-bootstrap";
import LottieAnimation from "assets/animations/lottie";
import jumbotronlanding from "assets/animations/jumbotronlanding.json";
import "./Home.scss";

const Home = () => {

    return (
        <Fade
            left
            duration={1000}
            delay={500}
            distance="30px"
        >
            <Container fluid>
                <LottieAnimation lotti={jumbotronlanding} width={500} height={500} />
            </Container>
      </Fade>
    );

};

export default Home;
