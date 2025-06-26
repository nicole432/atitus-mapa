import "./logo.css";
import logoImage from "../../assets/logo/image 9.png";
export const Logo = () => {
  return (
    <div>
      <img className="imageLogo" src={logoImage} alt="" />
    </div>
  );
};