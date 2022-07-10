import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './HomePage.css';

function HomePage({removeCookie}) {
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
    const openProduct = (id) =>{
      fetch(`/api/product/${id}`).then((res) => res.json()).then(data => {
        if (id === 1) {
          setProduct(data)
          setMessage('')
        } else if(id === 2) {
          setMessage(data.headers['x-message'])
          setProduct({})
        } else {
          logout()
          navigate('/', { state: { message: data.headers['x-message'] } });
        }
      
      }).catch(err => console.log(err))
    }

    const logout = () =>{
      removeCookie('isLoggedIn')
    }

    return (
      <div className="Home">
     <div className='btn-container'>
        <button  onClick={() => openProduct(1)}>Product 1</button>
        <button  onClick={() => openProduct(2)}>Product 2</button>
        <button  onClick={() => openProduct(3)}>Product 3</button>
        <button  onClick={logout}>Logout</button>
     </div>
      {Object.keys(product).length ? <div className='product-card'>
       <span className='circle' style={{background: product.color}}/>
        <div>Name: {product.name}</div>
        <div>Price: {product.price}</div>
        <div>Color: {product.color}</div>
       </div> : null}
       {message ? <div className='error-message'>
        {message}
       </div> : null}
      </div>
    );
  }
  
  export default HomePage;
  