import LottieAnimation from "assets/animations/lottie";
import anim404 from "assets/animations/anim404.json";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.scss";
import Button from "react-bootstrap/Button";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="PageNotFound">
        <LottieAnimation lotti={anim404} height={400} width={400} />

        <p>Oups, on dirait que la page que vous cherchez n'existe pas 😭</p>

        <Button
            className="ButtonPrimaryCustom my-5"
            onClick={() => navigate("/")}
        >
            Retour à l'accueil
        </Button>
    </div>
  );
};

export default PageNotFound;