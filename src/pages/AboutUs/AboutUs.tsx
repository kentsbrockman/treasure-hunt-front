import { Image } from "react-bootstrap";
import ceo from "assets/images/CEO.jpg";

const AboutUs = () => { 
  
  return (
    <div className="AboutUs text-center">
        <h2 className="header mb-3">Le mot du Directeur Général</h2>
        <Image
          src={ceo}
          className="img-fluid rounded-circle my-3"
          alt="Picture of the fictional CEO of Treasure Hunt"
          style={{height: "200px"}}
        />
        <h5 className="text-muted my-3">Quentin P.</h5>
        <div className="fst-italic mt-3">
            <p>Transformer les insights créateurs de valeur permet assurément <br/>de boostrapper des clusters from scratch et in fine de sanctuariser une overview disruptive.</p>
        </div>
    </div>
  );
};
  
export default AboutUs;