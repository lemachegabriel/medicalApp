import styles from './styles/home.module.css'
import Menu from '../components/navBar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from 'react-bootstrap';
import Register from '../components/RegisterForms';
import React, { useState, useEffect } from 'react';

export default function index(){
    const [register, setRegister] = useState(false);
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