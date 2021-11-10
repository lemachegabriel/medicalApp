import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from "./styles/sideBar.module.css"
import {RiLogoutCircleLine} from 'react-icons/ri'

function SideBar() {
  const [login, setLogin] = useState(false);

  const redirect = (e) => {
    Router.push(e.target.id)
  }

  return (
    <>
      
      <div className={styles.container}>
        <ul className={styles.items}>
          <li>
            <RiLogoutCircleLine/>
            <a>Sair</a>
          </li>
          
        </ul>
        
      </div>
    </>
  );
}

export default SideBar;
