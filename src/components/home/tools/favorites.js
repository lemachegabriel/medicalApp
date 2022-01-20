import styles from '../styles/tools/favoritos.module.css'
import { FaStar, FaTrashAlt } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import {BsQuestionCircle} from 'react-icons/bs'
import {MdPlayArrow, MdModeEdit } from 'react-icons/md'
import { useAuth } from '../../../contexts/authContext'
import { useAtivos } from '../../../contexts/ativosContext'

export default function Favoritos(){
    const [favs, setFavs] = useState([])
    const [open, setOpen] = useState()
    const [page, setPage] = useState(0)
    const [dataMed, setDataMed] = useState('')
    const [edit, setEdit] = useState(false)
    const { currentUser, removeFav, addFav, getUser} = useAuth()
    const { getAtivo } = useAtivos()


    useEffect(()=> {
        setFavs(currentUser.data.favoritos)
    }, [])

    const handelClick = async (key, medId) => {
        if(key == open){
            setOpen(null)
            setDataMed('')
        }else{
            const DATA = await getAtivo(medId)
            setDataMed(DATA.data())
            setOpen(key)
        }
    }
    const getMed = async (e)=> {
        const DATA = await queryID(e.target.id)
        setDataMed(DATA)
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <FaStar/>
                <a onClick={()=> console.log(favs.user['favorites'])}>Ativos Favoritos:</a>
            </div>
            <div className={styles.filters}>
                <a className={styles.edit} onClick={()=>setEdit(!edit)} style={edit ? {backgroundColor: '#8fcb3c', border:'none', color:'aliceblue', boxShadow:'rgba(68, 68, 68, 0.24) 0px 3px 8px 0px'} : {}}>
                    Editar
                    <MdModeEdit/>
                </a>
                
            </div>
            {favs ? favs.slice(0 + (page*8) ,8 + (page*8)).map((value, key)=>{ return(
                <>
                <div className={styles.tableContainer} style={open==key ? {minHeight: '100px'} : {minHeight: '50px'}}>
                    <div className={open==key ? styles.listHeaderTurn : styles.listHeader}>
                        {edit ? (
                            <FaTrashAlt className={open==key ? styles.listStar : styles.listStarTurn}/>
                        ) : (
                            <FaStar className={open==key ? styles.listStar : styles.listStarTurn}/>
                        )}
                        {open == key && (<BsQuestionCircle className={styles.question}/>)}
                        <a className={styles.listName} style={open==key ? {left: '80px'} : {}}>{value['nome']}</a>
                        <div onClick={()=>{handelClick(key, value['uid'])}} className={styles.listArrow} >
                            <MdPlayArrow className={open==key ? styles.arrowTurn : styles.arrow}/>
                        </div>
                    </div>
                    {open==key && (
                        <div className={styles.description}>
                            <p>{dataMed['descricao']}</p>
                        </div>
                    )}
                </div>
                </>
                    )
                }) : (<div>olasss</div>)}
                <div className={styles.pages}>
                {Array(Math.ceil(favs.length/8)).fill(1).map((value, key)=>{
                    return(
                        <a style={page==key ? {color: '#8fcb3c'} : {}} onClick={()=> setPage(key)}>{key+1}</a>
                )})}
            </div>
        </div>
    )
}