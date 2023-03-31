import LottieAnimation from "assets/animations/lottie";
import anim404 from "assets/animations/anim404.json";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.scss";

// @ts-ignore
import Fade from "react-reveal/Fade";

import Button from "react-bootstrap/Button";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="PageNotFound">
        <Fade
            left
            duration={1000}
            delay={500}
            distance="30px"
        >
            <LottieAnimation lotti={anim404} height={400} width={400} />

            <p>Oups, on dirait que la page que vous cherchez n'existe pas 😭</p>

            <Button
                variant="primary"
                className="my-5"
                onClick={() => navigate("/")}
            >
                Retour à l'accueil
            </Button>
        </Fade>
    </div>
  );
};

export default PageNotFound;