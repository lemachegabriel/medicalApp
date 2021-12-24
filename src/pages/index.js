import styles from './styles/index.module.css'
import React, { useState } from 'react';
import {verify_user_logIn} from '../lib/api/auth'
import router from 'next/router'

import {BsFileEarmarkText} from 'react-icons/bs'
import {MdOutlineMedicalServices} from 'react-icons/md'
import {FaEnvira, FaUserCircle} from 'react-icons/fa'

export default function index(){
    const [register, setRegister] = useState(false);
    
    const validate = async () => {
        const data = await verify_user_logIn()
       
    }
    validate()
    return(
        <div style={{backgroundColor: '#fbfbfb', height: '100%', width : '100%', position: 'absolute', zIndex: '-1'}}> 
            <header>
                <div className={styles.bottomHalf}>
                    <img className={styles.logo} src='/img/logo.svg'/>
                    <div className={styles.menuHeader} onClick={()=> router.push('/login')}>
                        <FaUserCircle/>
                        <a>Login</a>
                    </div>
                </div>
            </header>
                <div className={styles.containerVideo}>
                    <video className={styles.videoBG} poster='img/poster.png' autoPlay muted loop>
                        <source src='video/Backvideo Adobecreativecloudexpress-1.m4v' type='video/mp4'></source>
                    </video>
                    <div className={styles.title}>
                        <a>A melhor fórmula de prescrição</a>
                        <div className={styles.register}>
                            <a onClick={()=> router.push('/register')}>Faça parte da Activus</a>
                        </div>
                        <div className={styles.containerRest}>
                            <div className={styles.descriptions}>
                                <div className={styles.about}>
                                    <h1>Sua plataforma interativa pronta para sua prescrição magistral</h1>
                                    Tenha em suas mãos dicas de ativos farmaceuticos, posologias, formulações e interações medicamentosas
                                </div>
                                <div className={styles.products}>
                                    <div className={styles.productsInfo}>
                                        <FaEnvira/>
                                        <h1>Ativos</h1>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',</p>
                                    </div>
                                    <div className={styles.productsInfo}>
                                        <MdOutlineMedicalServices/>
                                        <h1>Patologias</h1>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',</p>
                                    </div>
                                    <div className={styles.productsInfo}>
                                        <BsFileEarmarkText/>
                                        <h1>Receitas</h1>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div> 
                </div> 
        </div>    
)
}