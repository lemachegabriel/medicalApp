import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from "./styles/navbar.module.css"

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const redirect = (e) => {
    Router.push(e.target.id)
  }
  

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
            logo
          <ul className={styles.nav_menu}>
            <li>
              <a id='/' className={styles.nav_links} onClick={redirect}>
                Home
              </a>
            </li>
            <li>
              <a id='/services' className={styles.nav_links} onClick={redirect}>
                Services
              </a>
            </li>
            <li>
              <a id='/products' className={styles.nav_links} onClick={redirect}>
                Products
              </a>
            </li>
          </ul>
        
        </div>
      </nav>
    </>
  );
}

export default Navbar;
