import { useAuth0 } from '@auth0/auth0-react';
import Logo from '../components/Logo';

export default function LoginPage() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="login-container">
      <Logo />
    
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="login-btn"
        >
          log in
        </button>
      ) : (
        <div className="welcome-container">
          <p className="welcome-text">welcome, {user?.name}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="logout-btn"
          >
            log out
          </button>
        </div>
      )}
    </div>
  );
}