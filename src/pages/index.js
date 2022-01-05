import styles from './styles/index.module.css'
import React, { useEffect } from 'react';
import router from 'next/router'
import {useAuth} from '../contexts/authContext'
import {BsFileEarmarkText} from 'react-icons/bs'
import {MdOutlineMedicalServices} from 'react-icons/md'
import {FaEnvira, FaUserCircle} from 'react-icons/fa'

export default function index(){
    const {currentUser} = useAuth()
    useEffect(()=>{
        console.log('dsada')
        if(currentUser){
            router.push('/home')
        }
    })

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
                        <a onClick={()=> router.push('/registro')}>Faça parte da Activus</a>
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
                                    <p>
                                        Tenha em suas mãos vários ativos em uso nas principais farmácias de manipulação e os lançamentos da indústria farmacêutica, para o tratamento de seus pacientes
                                    </p>
                                </div>
                                <div className={styles.productsInfo}>
                                    <MdOutlineMedicalServices/>
                                    <h1>Patologias</h1>
                                    <p>
                                        Confira nossas dicas de formulações interações para diferentes patologias e faça suas solicitações de ativos e formulações
                                    </p>
                                </div>
                                <div className={styles.productsInfo}>
                                    <BsFileEarmarkText/>
                                    <h1>Receitas</h1>
                                    <p>
                                        Com uma área exclusiva para personalizar sua receita e montar de forma mais rápida, segura e de maneira personalizada sua prescrição
                                    </p>
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div> 
            </div> 
        </div>    
    )
}