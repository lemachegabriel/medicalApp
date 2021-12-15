import styles from '../styles/tools/favoritos.module.css'
import { FaStar } from 'react-icons/fa'
import { verify_cookie_auth } from '../../../lib/api/auth'
import { queryID } from '../../../lib/api/storeMed'
import React, { useState, useEffect } from 'react'
import {BsQuestionCircle} from 'react-icons/bs'
import {MdPlayArrow } from 'react-icons/md'

export default function Favoritos(){
    const [favs, setFavs] = useState([])
    const [open, setOpen] = useState()
    const [page, setPage] = useState(0)
    const [dataMed, setDataMed] = useState('')

    const getFav = async () =>{
        const DATA = await verify_cookie_auth()
        if(DATA.auth){
          setFavs(DATA.user['favorites'])
        }
      }
      useEffect(()=> {
        getFav()
    }, [])

    const handelClick = async (key, medId) => {
        if(key == open){
            setOpen(null)
            setDataMed('')
        }else{
            const DATA = await queryID(medId)
            setDataMed(DATA)
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
            {favs ? favs.slice(0 + (page*8) ,8 + (page*8)).map((value, key)=>{ return(
                <div className={styles.tableContainer} style={open==key ? {minHeight: '100px'} : {minHeight: '50px'}}>
                    <div className={open==key ? styles.listHeaderTurn : styles.listHeader}>
                        <FaStar className={open==key ? styles.listStar : styles.listStarTurn}/>
                        {open == key && (<BsQuestionCircle className={styles.question}/>)}
                        <a className={styles.listName} style={open==key ? {left: '80px'} : {}}>{value['name']}</a>
                        <div onClick={()=>{handelClick(key, value['_id'])}} className={styles.listArrow} >
                            <MdPlayArrow className={open==key ? styles.arrowTurn : styles.arrow}/>
                        </div>
                    </div>
                    {open==key && (
                        <div className={styles.description}>
                            <p>{dataMed['description']}</p>
                        </div>
                    )}
                </div>
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