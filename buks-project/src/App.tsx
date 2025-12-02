import { useAuth0 } from '@auth0/auth0-react';
//import LoginPage from './pages/loginPage';
import HelloPage from './pages/helloPage';
import BookSearchPage from './pages/bookSearchPage';
import MyBooksPage from './pages/myBooksPage';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) 
    return <p>Loading...</p>;
  
  if(!isAuthenticated)
    return <HelloPage />;
    //return <LoginPage />;

  return (
    <div className="app-container font-generalsans ">
      {/* <Header /> */}
      <main className="center-layout">
        <Routes>
          <Route path="/" element={<MyBooksPage />} />
          <Route path="/search" element={<BookSearchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
