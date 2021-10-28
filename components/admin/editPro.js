import React, {useState} from "react"
import {createPro, addMedPro, update, delMedPro} from '../../lib/api/problems'
import { Button, Row, Modal, Col, InputGroup, FormControl } from "react-bootstrap";
import Select from "react-select";
import styles from "./styles/editMed.module.css"


function EditPro({ setedit, edit, data, meddata, selectedP}) {
    const [newData, setNewData] = useState({})
    const [ativos, setAtivos] = useState([])
    const [selMed, setSelMed] = useState(selectedP)
    const [selMed2, setSelMed2] = useState(selectedP)
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
    const updatePro = async () => {
        await update(data['_id'], newData)
        

        if(selMed.length == 0){
            await delMedPro (data['_id']) 
        }else if(selectedP.length == 0){
            for(let i=0; i<selMed.length; i++) await addMedPro(selMed[i]['label'], selMed[i]['value'], data['_id'])
        }else{
            await delMedPro(data['_id'])
            for(let i=0; i<selMed.length; i++) await addMedPro(selMed[i]['label'], selMed[i]['value'], data['_id'])
        }
        setedit(false)
    }
    
    return(
        <Modal show={edit} onHide={()=> setedit(false)} size="lg" backdrop="static" keyboard={false} >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar doença:
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
                            <FormControl id="name" size="sm" onChange={handleChange} defaultValue={data['name']}/>
                        </InputGroup>
                    </Col>
                </Row>    
                <Row>
                    <Col>
                        <h5>
                            Ativos:
                        </h5>
                    </Col>
                    <a onClick={setNewProData }>
                        <Select
                            isMulti
                            placeholder='selecione ativos'
                            defaultValue={selectedP}
                            closeMenuOnSelect={false}   
                            options={ativos}
                            onChange={handleSelectChange}
                        />
                    </a>
                    
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=> setedit(false)}>Cancelar</Button>
                <Button onClick={updatePro}> Salvar</Button>
                
            </Modal.Footer>
        </Modal>
    )
}

export default EditPro