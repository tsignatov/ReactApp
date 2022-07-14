import './App.css';
import { useEffect } from "react";
import  HomePage  from './HomePage';
import  LoginPage  from './LoginPage';
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(['isLoggedIn']);
  useEffect(() => {
    !Object.keys(cookie).length && removeCookie('isLoggedIn')
  }, []);

  const ProtectedRoute = ({
    hasCookie,
    redirectPath = '/',
    children,
  }) => {
    if (!hasCookie) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<LoginPage  setCookie={setCookie} hasCookie={Object.keys(cookie).length}/>} />
      <Route
          path="home"
          element={
            <ProtectedRoute hasCookie={Object.keys(cookie).length}>
              <HomePage removeCookie={removeCookie}/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={Object.keys(cookie).length ? <HomePage removeCookie={removeCookie}/> : 
          <LoginPage setCookie={setCookie} hasCookie={Object.keys(cookie).length}/>} />
      </Routes>
    </div>
  );
}

export default App;
