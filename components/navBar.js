import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from "./styles/navbar.module.css"

import Login from './loginForm';

function Menu() {
  const [click, setClick] = useState(false);
  const [login, setLogin] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const redirect = (e) => {
    Router.push(e.target.id)
  }


  return (
    <>
      {login && <Login setLog={setLogin} log={login}></Login>}
      <div className={styles.container}>
        <img className={styles.logo} src='/img/logo.svg'/>
        <div>
          <a className={styles.loginBut} onClick={() => {setLogin(true)}}>Login</a>
        </div>
        
      </div>
          
        
          
        
        

    </>
  );
}

export default Menu;
