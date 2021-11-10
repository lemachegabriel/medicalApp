import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from "./styles/navbar.module.css"
import {FaUserCircle} from 'react-icons/fa'

function Menu(userData) {
  return (
    <header className={styles.navBar}>
      <div className={styles.container}>
        <img className={styles.logo} src='/img/logo.svg'/>
        <div className={styles.userName}>
          <FaUserCircle/>
          <a>Olá, {userData['userData']}</a>
        </div>
        
      </div>
    </header>
  );
}

export default Menu;
