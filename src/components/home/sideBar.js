import React, { useState, useEffect } from 'react';
import styles from "./styles/sideBar.module.css"
import {RiLogoutCircleLine, RiSettings4Line} from 'react-icons/ri'
import {BsFileEarmarkText} from 'react-icons/bs'
import {FaEnvira} from 'react-icons/fa'
import {MdOutlineMedicalServices} from 'react-icons/md'
import {AiOutlineStar} from 'react-icons/ai'
import Receitas from './tools/receitas';
import Ativos from './tools/ativos';
import Doencas from './tools/doencas';
import Favoritos from './tools/favorites';
import {useAuth} from '../../contexts/authContext'
import router from 'next/router';

export default function SideBar() {
  const [selected, setSelected] = useState('ativos')
  const [favs, setFavs] = useState()
  const {logout, getUser, currentUser, setCurrentUser} = useAuth()

  useEffect(()=>{
    console.log(currentUser.uid)
    const op = localStorage.getItem('option')
    if(op) setSelected(op)
  },[])
  useEffect(()=>{
    localStorage.setItem('option', selected)
  })

  const out = async ()=>{
    await logout()
    .then(()=>{
      router.push('/')
    })
  }
  return (
    <>
      {selected == 'receitas' && <Receitas/>}
      {selected == 'ativos' && <Ativos/>}
      {selected == 'categorias' && <Doencas/>}
      {selected == 'favoritos' && <Favoritos/>}
      <div className={styles.container}>
        <div className={styles.item} onClick={()=>{setSelected('receitas')}} style={{backgroundColor : selected=='receitas' ? '#15181b' : '#23282d'}}>
          <BsFileEarmarkText/>
          <a>Receitas</a>
        </div>
        <div className={styles.item} onClick={()=>setSelected('ativos')} style={{backgroundColor : selected=='ativos' ? '#15181b' : '#23282d'}}>
          <FaEnvira/>
          <a>Ativos</a>
        </div>
        <div className={styles.item} onClick={()=>setSelected('categorias')} style={{backgroundColor : selected=='categorias' ? '#15181b' : '#23282d'}}>
          <MdOutlineMedicalServices/>
          <a>Patologias</a>
        </div>
        {/* <div className={styles.item} onClick={()=>setSelected('ajustes')} style={{backgroundColor : selected=='ajustes' ? '#15181b' : '#23282d'}}>
          <RiSettings4Line/>
          <a>Ajustes</a>
        </div> */}
        <div className={styles.item} onClick={()=>{getUser(currentUser.uid); setSelected('favoritos')}} style={{backgroundColor : selected=='favoritos' ? '#15181b' : '#23282d'}}>
          <AiOutlineStar/>
          <a>Favoritos</a>
        </div>
        <div className={styles.logout}>
          <RiLogoutCircleLine onClick={out}/>
          <a onClick={out}>Sair</a>
        </div>        
      </div>
    </>
  );
}