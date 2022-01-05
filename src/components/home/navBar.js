import React, { useState } from 'react';
import styles from "./styles/navbar.module.css"
import {FaUserCircle} from 'react-icons/fa'
import {RiLogoutCircleLine} from 'react-icons/ri'
import {useAuth} from '../../contexts/authContext'
import router from 'next/router';

export default function Menu(userData) {
  const [name, setName] = useState('')
  const {logout} = useAuth()
  const out = async ()=>{
    await logout()
    .then(()=>{
      router.push('/')
    })
  }
  return (
    <header className={styles.navBar}>
      <div className={styles.container}>
        <img className={styles.logo} src='/img/logo.svg'/>
        <div className={styles.userName}>
          <FaUserCircle/>
          <a>Olá, {userData['userData']}</a>
          <div className={styles.logout}>
            <RiLogoutCircleLine className={styles.logout_svg} onClick={out}/>
            <p onClick={out}>Sair</p>
          </div>
        </div>        
      </div>      
    </header>
  );
}
