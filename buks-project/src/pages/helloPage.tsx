import FrontButton from "../assets/segment_front.svg?react";
import MiddleShape from "../assets/segment_middle.svg?react";
import BackShape from "../assets/segment_back.svg?react";
import LogoImg from "../assets/logo-transparent-svg.svg";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from "react";


export default function HelloPage() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);

    setTimeout(() => {
      if (!isAuthenticated) {
        loginWithRedirect();
      } else {
        logout({ logoutParams: { returnTo: window.location.origin } });
      }
    }, 0);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overlay-container">
      <div className="logo-container">
        <img src={LogoImg} className="logoImg" />
      </div>

      <div className="layers-wrapper">
        <div 
          className={`front-button ${clicked ? "clicked" : ""}`} 
          onClick={handleClick}
        >
          <FrontButton className="front-button-svg" />
          <span className="front-button-text">
            {isAuthenticated ? "log out" : "log in / sign up"}
          </span>
        </div>
        <BackShape className="layer layer-back" />
        <MiddleShape className="layer layer-middle" />
      </div>
    </div>
  );
}