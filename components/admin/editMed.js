import Modal from "react-bootstrap/Modal"
import { Row, Col, InputGroup, FormControl, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/editMed.module.css"
import { updateMed } from "../../lib/api/storeMed";
import React, { useState } from 'react';


function EditMed({ setedit, edit, data}){
    const options = ['medico', 'nutricionista', 'farmaceutico']
    const [medData, setMed] = useState(data)
    const [newData, setNewData] = useState({})
    const handleChange = (e) => {
        newData[`${e.target.id}`] = e.target.value
    }
    const handleCheckChange = (e) => {
        newData[`${e.target.id}`] = e.target.checked
    }
    const update = async () => {
        await updateMed(medData['_id'], newData).
        then(() => {
            setedit(false)
        })
    }
    return (     
        <Modal show={edit} onHide={()=> setedit(false)} size="lg" backdrop="static" keyboard={false} >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar ativo:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md="auto">
                        <h5>
                            Nome:
                        </h5>
                    </Col>
                    <Col xs lg="2">
                        <InputGroup>
                            <FormControl id="name" size="sm" defaultValue={medData["name"]} onChange={handleChange} />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form>
                            {options.map((type)=> (
                                <Form.Check
                                    inline
                                    id={type}
                                    label={type}
                                    onChange={handleCheckChange}
                                    defaultChecked={medData[`${type}`]}
                                    type="checkbox"
        
                                />
                            ))}
                        </Form>
                    </Col>
                </Row>
                
                <Row className={styles.desc}>
                    <Col md="auto">
                        <h5>
                            Descriçao:
                        </h5>
                    </Col>
                    <Form>
                        <Form.Group>
                            <Form.Control id="description" as="textarea" defaultValue={medData["description"]} onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> setedit(false)}>Cancelar</Button>
                <Button onClick={update}> Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default EditMed