import { Link } from "react-router-dom";
import "./logo.css";

export const Logo = () => {
  return (
    <Link to="/">
      <div className="logo-container">
        <img src="/assets/sevae_logo.png" alt="Logo"></img>
      </div>
    </Link>
  );
};
