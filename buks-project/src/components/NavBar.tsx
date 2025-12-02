import { useAuth0 } from '@auth0/auth0-react';
import SegmentLeft from "../assets/segment_left.svg?react";
import NavButton from "../assets/nav_button.svg?react";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleSearch?: () => void;
  showSearch?: boolean;
}

export default function NavBar({ onToggleSearch, showSearch }: HeaderProps) {
  const { logout, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(showSearch ? '/' : '/search');
    if (onToggleSearch) onToggleSearch();
  };

  return (
    <div className="nav-bar">
      <div className="segment-container">
        <SegmentLeft className="segment-left" />
      </div>
      {isAuthenticated && (
        <div className="nav-bar-buttons">
          <div className="button-wrapper">
            <NavButton className="button-background" />
            <button className="overlay-btn" onClick={handleSearchClick}>
              {showSearch ? 'home' : 'search'}
            </button>
          </div>
          <div className="button-wrapper">
            <NavButton className="button-background" />
            <button className="overlay-btn" onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
