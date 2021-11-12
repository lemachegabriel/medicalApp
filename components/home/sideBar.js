import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import styles from "./styles/sideBar.module.css"
import {RiLogoutCircleLine} from 'react-icons/ri'
import {BsFileEarmarkText} from 'react-icons/bs'
import {FaEnvira} from 'react-icons/fa'
import {MdOutlineMedicalServices} from 'react-icons/md'
import {RiSettings4Line} from 'react-icons/ri'
import {AiOutlineStar} from 'react-icons/ai'

function SideBar() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <BsFileEarmarkText/>
          <a>Receitas</a>
        </div>
        <div className={styles.item}>
          <FaEnvira/>
          <a>Ativos</a>
        </div>
        <div className={styles.item}>
          <MdOutlineMedicalServices/>
          <a>Doenças</a>
        </div>
        <div className={styles.item}>
          <RiSettings4Line/>
          <a>Ajustes</a>
        </div>
        <div className={styles.item}>
          <AiOutlineStar/>
          <a>Favoritos</a>
        </div>
        <div className={styles.logout}>
          <RiLogoutCircleLine/>
          <a>Sair</a>
        </div>
        
      </div>
    </>
  );
}

export default SideBar;
