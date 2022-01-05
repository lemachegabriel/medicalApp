import React, {useState, useEffect} from 'react'
import { useAtivos } from "../contexts/ativosContext"
import {FaStar} from 'react-icons/fa'
import {MdPlayArrow} from 'react-icons/md'
import {BsQuestionCircle} from 'react-icons/bs'
import styles from './styles/teste.module.css'

export default function teste() {
    const {getAll} = useAtivos()
    const [data, setData] = useState('')
    const [open, setOpen] = useState()

    const handelClick = (key) => {
        if(key == open){
            setOpen(null)
        }else{
            setOpen(key)
        }
    }
    const getAllMed = async ()=> {
        const DATA = await getAll()
        const Array = []
        DATA.forEach(element => {
            Array.push({id: element.id, data : element.data()})
        })
        setData(Array)
    }
    
    return (
        <div style={{backgroundColor: 'white', width: '100%', height: '100%', position: 'absolute'}}>
            <button onClick={getAllMed}>Atualizar</button>
            {data && data.slice(0, data.length).map((value, key)=> { return(
                <div className={styles.tableContainer} style={open==key ? {minHeight: '100px'} : {minHeight: '50px'}}> 
                    <div className={open==key ? styles.listHeaderTurn : styles.listHeader}>
                        <FaStar className={open==key ? styles.listStar : styles.listStarTurn} onClick={()=> addFavs(value.data.nome, value['_id'])}/>
                        {open == key && (<BsQuestionCircle className={styles.question}/>)}
                        <a className={styles.listName} style={open==key ? {left: '80px'} : {}}>{value.data.nome}</a>
                        <div onClick={()=>{handelClick(key)}} className={styles.listArrow} >
                            <MdPlayArrow className={open==key ? styles.arrowTurn : styles.arrow}/>
                        </div>
                    </div>
                    {open==key && (
                        <div className={styles.description}>
                            <p>{value.data.descricao}</p>  
                            <p>Dosagem: {value.data.dosagem}</p>                      
                        </div>
                    )}     
                </div>
            )})}
        </div>
    )
}
