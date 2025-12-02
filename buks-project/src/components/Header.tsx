import { useAuth0 } from '@auth0/auth0-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';


interface HeaderProps {
  onToggleSearch?: () => void;
  showSearch?: boolean;
}

export default function Header({ onToggleSearch, showSearch }: HeaderProps) {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <header className="header">
      <Logo />

      {isAuthenticated && (
        <div className="header-buttons">
          <Link to="/search">
            <button
              className="search-toggle-btn"
              onClick={onToggleSearch}
            >
              {showSearch ? 'home' : 'search'}
            </button>
          </Link>

          <button
            className="logout-btn"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            log out
          </button>
        </div>
      )}
    </header>
  );
}
