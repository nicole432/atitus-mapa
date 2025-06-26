import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";
import logoImage from "../../assets/logo/image 9.png";
export function Navbar() {
    const { logout } = useAuth();

    return (
        <header className="navbar">
            <img src={logoImage} alt="Logo" className="logo-navbar" />
            <p>SABORIZE</p>
            <button className="close" onClick={logout}>X</button>
        </header>
    );
}