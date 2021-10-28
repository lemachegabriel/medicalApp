import styles from './styles/home.module.css'
import Menu from '../components/navBar'
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Row, Col, Image, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

export default function index(){
    return(
        <>
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
                            <a className={styles.regBut}>Registre-se</a>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </>
    )
}