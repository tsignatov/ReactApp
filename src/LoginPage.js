import { useState } from "react";
import { Navigate } from 'react-router-dom'

function LoginPage({ hasCookie, setCookie}) {

  const createCookie = (name,value,minutes) => { 
    let currentDate = new Date();
    let futureDate = new Date(currentDate.getTime() + minutes*6000);
    setCookie(name,value, { path: '/',expires: futureDate});
}

    const [data, setData] = useState({
        username: '',
        password: '',
      });
      const changeHandler = (e) => {
        setData({...data, [e.target.name]: e.target.value})
      }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login', {method: 'POST', body: JSON.stringify( data)}).then(res => {
          if(res.status === 200) {
            createCookie("isLoggedIn", true, 1);
          }
        })
    
      }
    return (
      <div className="Login">
        {hasCookie ? <Navigate to={'/home'} replace /> : null}
            <div>
            <h2>Login Page</h2>
            <form action="/home">
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="username" required onChange={changeHandler}/>
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" required onChange={changeHandler}/>
                </p>
                <p>
                    <button type="submit" onClick={handleFormSubmit}>Login</button>
                </p>
            </form>
        </div>
      </div>
    );
  }
  
  export default LoginPage;
  