import React, {useState} from "react"
import {createPro, addMedPro} from '../../lib/api/problems'
import { Button, Row, Modal, Col, InputGroup, FormControl } from "react-bootstrap";
import Select from "react-select";
import styles from "./styles/editMed.module.css"


function AddPro({setadd, add, meddata}) {
    const [newData, setNewData] = useState({})
    const [ativos, setAtivos] = useState([])
    const [selMed, setSelMed] = useState([])
    const arrData = []

    const setNewProData = () => {
        if(arrData.length == 0){
            for(let i=0; i<meddata.length; i++){
                arrData.push({value: meddata[i]['_id'], label: meddata[i]['name']})
            }
            setAtivos(arrData)
        }
    }
    const handleChange = (e) => {
        newData[`${e.target.id}`] = e.target.value
    }
    const handleSelectChange = (e) => {
        setSelMed(e)
    }
    const update = async () => {
        const data = await createPro(newData)
        if(data) {
            for(let i=0; i<selMed.length; i++){
                await addMedPro(selMed[i]['label'], selMed[i]['value'], data['_id'])
            }
        }
        setadd(false)
    }
    
    return(
        <Modal show={add} onHide={()=> setadd(false)} size="lg" backdrop="static" keyboard={false} >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Adicionar doença:
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
                </Row>    
                <Row>
                    <Col>
                        <h5>
                            Ativos:
                        </h5>
                    </Col>
                    <a onClick={setNewProData}>
                        <Select
                            isMulti
                            placeholder='selecione ativos'
                            closeMenuOnSelect={false}   
                            options={ativos}
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

export default AddPro