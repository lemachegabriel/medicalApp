import React, { useState, useEffect } from 'react';
import styles from "./styles/sideBar.module.css"
import {RiLogoutCircleLine, RiSettings4Line} from 'react-icons/ri'
import {BsFileEarmarkText} from 'react-icons/bs'
import {FaEnvira} from 'react-icons/fa'
import {MdOutlineMedicalServices} from 'react-icons/md'
import {AiOutlineStar} from 'react-icons/ai'
import Receitas from './tools/receitas';
import Ativos from './tools/ativos';

export default function SideBar() {
  const [selected, setSelected] = useState('ativos')

  useEffect(()=>{
    const op = localStorage.getItem('option')
    if(op) setSelected(op)
  },[])
  useEffect(()=>{
    localStorage.setItem('option', selected)
  })
  
  return (
    <>
      {selected == 'receitas' && <Receitas/>}
      {selected == 'ativos' && <Ativos/>}
      <div className={styles.container}>
        <div className={styles.item} onClick={()=>{setSelected('receitas')}} style={{backgroundColor : selected=='receitas' ? '#15181b' : '#23282d'}}>
          <BsFileEarmarkText/>
          <a>Receitas</a>
        </div>
        <div className={styles.item} onClick={()=>setSelected('ativos')} style={{backgroundColor : selected=='ativos' ? '#15181b' : '#23282d'}}>
          <FaEnvira/>
          <a>Ativos</a>
        </div>
        <div className={styles.item} onClick={()=>setSelected('doencas')} style={{backgroundColor : selected=='doencas' ? '#15181b' : '#23282d'}}>
          <MdOutlineMedicalServices/>
          <a>Doenças</a>
        </div>
        <div className={styles.item} onClick={()=>setSelected('ajustes')} style={{backgroundColor : selected=='ajustes' ? '#15181b' : '#23282d'}}>
          <RiSettings4Line/>
          <a>Ajustes</a>
        </div>
        <div className={styles.item} onClick={()=>setSelected('favoritos')} style={{backgroundColor : selected=='favoritos' ? '#15181b' : '#23282d'}}>
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