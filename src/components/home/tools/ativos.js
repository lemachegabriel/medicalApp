import styles from "../styles/tools/ativos.module.css"
import {FaSearch, FaStar} from 'react-icons/fa'
import {MdPlayArrow} from 'react-icons/md'
import { useState, useEffect } from "react"
import { getMed, queryMed } from "../../../lib/api/storeMed"
import AtivosSugest from "./ativosSugest"
import {BsQuestionCircle} from 'react-icons/bs'
import { verify_cookie_auth } from "../../../lib/api/auth"

export default function Ativos(){
    const [wordEntered, setWordEntered] = useState('')
    const [data, setData] = useState('')
    const [open, setOpen] = useState()
    const [all, setAll] = useState(false)
    const [page, setPage] = useState(0)
    useEffect(()=>{
        const op = localStorage.getItem('search')
        const da = localStorage.getItem('data')
        const al = localStorage.getItem('all')
        if(op) setWordEntered(op)
        if(da) setData(JSON.parse(da))
        if(al == 'true') setAll(true)
        else setAll(false)
      },[])
    useEffect(()=>{
        localStorage.setItem('search', wordEntered)
        localStorage.setItem('data', JSON.stringify(data))
        localStorage.setItem('all', all)
    })

    const handleChange = (e) => {
        setWordEntered(e.target.value)
    }
    const getAllMed = async ()=> {
        if(!all){
            setAll(true)
            const DATA = await indexMed()
            setData(DATA)
            setPage(0)
        }
    }
    const handleSubmit = async (e) => {
        // e.preventDefault()
        // if(wordEntered){
        //     const DATA = await queryMed(wordEntered)
        //     setData(DATA)
        //     setAll(false)
        //     setPage(0)
        // }
        await queryMed()
    }
    const handelClick = (key) => {
        if(key == open){
            setOpen(null)
        }else{
            setOpen(key)
        }
    }
    const addFavs = async (name, _id)=>{
        const validate = await verify_cookie_auth()
        let confirm = true
        for(let i=0; i<validate.user['favorites'].length; i++){
            if(validate.user['favorites'][i]['_id'] == _id){
                confirm = false
                break
            }
            confirm = true 
        }
        if(validate['auth'] && confirm==true){
            await addFav(name, _id, validate.user['_id'])
        }
    }
    const clear = () => {
        setData('')
        localStorage.setItem('data', data)
        setWordEntered('')
        setAll(false)
        setPage(0)
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.searchDiv}>
                <div className={styles.searchTitle}>
                    <img src='/img/folha.svg'></img>
                </div>
                <div className={styles.searchInput}>
                    <form onSubmit={handleSubmit}>
                        <input placeholder='Buscar ativos' value={wordEntered} onChange={handleChange}/>
                    </form>
                </div>
                <div className={styles.searchIcon} >
                    <FaSearch onClick={handleSubmit}/>
                </div>
            </div>
            <div className={styles.filters}>
                <a className={styles.limpar} onClick={getAllMed} style={all ? {backgroundColor: '#8fcb3c', border:'none', color:'aliceblue', boxShadow:'rgba(68, 68, 68, 0.24) 0px 3px 8px 0px'} : {}}>Todos Ativos</a>    
                {data && (
                    <a className={styles.limpar} onClick={clear}>Limpar</a>
                )}
            </div>
            {data ? data.slice(0 + (page*8) ,8 + (page*8)).map((value, key)=>{ return(
                <div className={styles.tableContainer} style={open==key ? {minHeight: '100px'} : {minHeight: '50px'}}> 
                    <div className={open==key ? styles.listHeaderTurn : styles.listHeader}>
                        <FaStar className={open==key ? styles.listStar : styles.listStarTurn} onClick={()=> addFavs(value['name'], value['_id'])}/>
                        {open == key && (<BsQuestionCircle className={styles.question}/>)}
                        <a className={styles.listName} style={open==key ? {left: '80px'} : {}}>{value['name']}</a>
                        <div onClick={()=>{handelClick(key)}} className={styles.listArrow} >
                            <MdPlayArrow className={open==key ? styles.arrowTurn : styles.arrow}/>
                        </div>
                    </div>
                    {open==key && (
                        <div className={styles.description}>
                            <p>{value['description']}</p>                        
                        </div>
                    )}     
                </div>
                )
            }) : (
                <AtivosSugest/>
            )}
            <div className={styles.pages}>
                {Array(Math.ceil(data.length/8)).fill(1).map((value, key)=>{
                    return(
                        <a style={page==key ? {color: '#8fcb3c'} : {}} onClick={()=> setPage(key)}>{key+1}</a>    
                )})}
            </div>
        </div>
        
    )
}