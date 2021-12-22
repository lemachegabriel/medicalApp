import styles from './styles/index.module.css'
import Register from '../components/index/RegisterForms';
import React, { useState } from 'react';

export default function teste(){
    const [register, setRegister] = useState(false);
    

    return(
        <>
        
        <div className={styles.container}>
            <div className={styles.header}>
                <img className={styles.logo} src='/img/logo.svg'/>
                <a className={styles.loginBut} onClick={() => {setLogin(true)}}>Login</a>
            </div>
            <div className={styles.body}>
                
                <div className={styles.image}>
                    <img className={styles.back_img} src='/img/background.svg/'></img>
                </div>
                <div className={styles.texts}>
                    <h1>Sua plataforma interativa pronta para sua prescrição magistral</h1>
                    <p>Tenha em suas mãos dicas de ativos farmaceuticos, posologias, formulações e interações medicamentosas</p>
                    <a onClick={()=> {setRegister(true)}} className={styles.regBut}>Registre-se</a>
                </div>
            </div>
        </div>
        </>
    )
}