import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from "./styles/navbar.module.css"
import { FaBars, FaCaretLeft } from "react-icons/fa";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const redirect = (e) => {
    Router.push(e.target.id)
  }
  

  return (
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
            logo
        <div className={styles.menu_icon} onClick={handleClick}>
            {click ? (<FaCaretLeft/>) : (<FaBars size={20}/>)}
        </div>
        <ul className={click ? (styles.nav_menu_active) : (styles.nav_menu)}>
            <li className={styles.nav_item}>
                <a id='/' className={styles.nav_links} onClick={redirect}>
                    Home
                </a>
            </li>
            <li className={styles.nav_item}>
              <a id='/services' className={styles.nav_links} onClick={redirect}>
                Services
              </a>
            </li>
            <li className={styles.nav_item}>
              <a id='/products' className={styles.nav_links} onClick={redirect}>
                Products
              </a>
            </li>
          </ul>
        </div>
      </nav>
  );
}

export default Navbar;
