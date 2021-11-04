import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from "./styles/navbar.module.css"


function Menu() {
  const [login, setLogin] = useState(false);

  const redirect = (e) => {
    Router.push(e.target.id)
  }

  return (
    <>
      
      <div className={styles.container}>
        <img className={styles.logo} src='/img/logo.svg'/>
        
      </div>
    </>
  );
}

export default Menu;
