import { style } from 'dom-helpers'
import React from 'react'
import styles from './styles/teste.module.css'

export default function teste() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.register}>
                    <form>
                        <img className={styles.logo} src='/img/logo.svg' style={{width: '200px'}}/>
                        <h2>Crie sua conta</h2>
                        <div className={styles.inputs}>
                            <label>Nome:</label>
                            <input placeholder='Digite seu nome'></input>
                        </div>
                        <div className={styles.inputs}>
                            <label>Nome:
                            <input placeholder='Digite seu nome'></input>
                            </label>
                            
                        </div>
                    </form>
                </div>
                <div className={styles.sideBarImg}></div>
            </div>
            
        </div>
    )
}
