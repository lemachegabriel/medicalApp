import React, {useState} from "react";
import MedTable from "./admin/medTable"
import { Row, Navbar, Nav, Container } from "react-bootstrap";
import styles from './styles/adminArea.module.css'
import ProTable from "./admin/problemsTable";

function Controllers(){
  const [option, setOption] = useState('add') 
  const [label, setLabel] = useState('ativos')
  const SETo = (e) => {
    setOption(e.target.id)
  }
  const SETl = (e) => {
    setLabel(e.target.id)
  }
  return(
   <>
      <Row>
        <Navbar className={styles.navBar}>
          <Container>
            <Navbar.Brand href="#home">Activus</Navbar.Brand>
            <Navbar.Text className={styles.navBarText}>Painel de Administração</Navbar.Text>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link id='ativos' onClick={SETl}>Ativos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link id='doencas' onClick={SETl}>Doenças</Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
      </Row>
      {label == 'ativos' ? (    
        <MedTable></MedTable>
      ):(
        <ProTable></ProTable>
      )}
    </>
  )
}

export default Controllers