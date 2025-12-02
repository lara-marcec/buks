import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/font.css';
import './styles/myBooksPage.css';
import './styles/header.css';
import './styles/helloPage.css';
import './styles/navbar.css';
import './styles/bookSearchPage.css';
import './styles/bookStatusDropDown.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-l0xxkyet03cip4n0.us.auth0.com"
    clientId="6261fbRegPwDwHHD9iVKYwZhnQYmbtC9"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);