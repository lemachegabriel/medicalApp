import styles from './styles/home.module.css'
import Menu from '../components/index/navBar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';
import Register from '../components/index/RegisterForms';
import React, { useState } from 'react';
import { verify_cookie_auth } from '../lib/api/auth'
import router from 'next/router'

export default function index(){
    const [register, setRegister] = useState(false);
    
    const validate = async () => {
        const data = await verify_cookie_auth()
        if(data['auth'] === true){
            router.push('/home')
        }
    }
    validate()
    return(
        <>
        {register && <Register setReg={setRegister} reg={register}></Register>}
        <Menu></Menu>
        <img className={styles.back_img} src='/img/background.svg/'></img>
        <Row>
            <Col sm={6} className={styles.texts}>
                <Row >
                    <h1>
                        Sua plataforma interativa pronta para sua prescrição magistral
                    </h1>
                    <p>
                        Tenha em suas mãos dicas de ativos farmaceuticos, posologias, formulações e interações medicamentosas
                    </p>
                </Row>
                <Row>
                    <Col>
                        <a onClick={()=> {setRegister(true)}} className={styles.regBut}>Registre-se</a>
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
    )
}