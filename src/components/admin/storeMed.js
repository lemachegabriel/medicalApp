import React, {useState} from "react"
import { storeMed } from "../../lib/api/storeMed"
import { addMedPro } from "../../lib/api/problems";
import { Form, Button, Row, Modal, Col, InputGroup, FormControl } from "react-bootstrap";
import styles from "./styles/editMed.module.css"
import Select from 'react-select';

function AddMed({setadd, add, prodata}) { 
    const options = ['medico', 'nutricionista', 'farmaceutico']
    const [newData, setNewData] = useState({})
    const [problems, setProblems] = useState([])
    const [selPro, setSelPro] = useState([])
    const arrData = []

    const setNewProData = () => {
        if(arrData.length == 0){
            for(let i=0; i<prodata.length; i++){
                arrData.push({value: prodata[i]['_id'], label: prodata[i]['name']})
            }
            setProblems(arrData)
        }
    }
    const handleChange = (e) => {
        newData[`${e.target.id}`] = e.target.value
    }
    const handleCheckChange = (e) => {
        newData[`${e.target.id}`] = e.target.checked
    }
    const handleSelectChange = (e) => {
        setSelPro(e)
    }
    const update = async () => {
        for(let j=0; j<options.length; j++) if(!newData[options[j]]) newData[options[j]] = false
        const data = await storeMed(newData)
        if(data) {
            for(let i=0; i<selPro.length; i++){
                await addMedPro(newData['name'], data['_id'], selPro[i]['value'])
            }
        }
        setadd(false)
    }
    return(
        
        <Modal show={add} onHide={()=> setadd(false)} size="lg" backdrop="static" keyboard={false} >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Adicionar ativo:
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
                            <FormControl id="name" size="sm" onChange={handleChange} />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form>
                            {options.map((type)=> (
                                <Form.Check
                                    inline
                                    id={type}
                                    defaultChecked={false}
                                    label={type}
                                    onChange={handleCheckChange}
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
                            <Form.Control id="description" as="textarea" onChange={handleChange}/>
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <Col>
                        <h5>
                            Problemas:
                        </h5>
                    </Col>
                    <a onClick={setNewProData}>
                        <Select
                            isMulti
                            placeholder='selecione funções'
                            closeMenuOnSelect={false}   
                            options={problems}
                            onChange={handleSelectChange}
                        />
                    </a>
                    
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> setadd(false)}>Cancelar</Button>
                <Button onClick={update}> Salvar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddMed