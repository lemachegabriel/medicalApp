import styles from "../styles/tools/ativos.module.css"
import {FaSearch, FaStar} from 'react-icons/fa'
import {MdPlayArrow} from 'react-icons/md'
import { useState, useEffect } from "react"
import AtivosSugest from "./ativosSugest"
import {BsQuestionCircle} from 'react-icons/bs'
import { useAtivos } from "../../../contexts/ativosContext"
import { useAuth } from "../../../contexts/authContext"

export default function Ativos(){
    const [wordEntered, setWordEntered] = useState('')
    const [data, setData] = useState('')
    const [open, setOpen] = useState()
    const [all, setAll] = useState(false)
    const [page, setPage] = useState(0)
    const {getAll} = useAtivos()
    const {addFav, currentUser} = useAuth()
    const [favs, setFavs] = useState(currentUser.data.favoritos)

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
            const DATA = await getAll()
            const Array = []
            DATA.forEach(element => {
                Array.push({id: element.id, data : element.data()})
            })
            setAll(true)
            setData(Array)
            setPage(0)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(wordEntered){
            const DATA = await getAll()
            const Array = []
            DATA.forEach(element => {
                if(element.data().nome.toLowerCase().includes(wordEntered.toLowerCase())){
                    Array.push({id: element.id, data : element.data()})
                }
            });
            Array.sort((a, b) => {
                let fa = a.data.nome.toLowerCase(), fb = b.data.nome.toLowerCase();
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
            for(let x=0; x<Array.length; x++){
                for(let y=0; y<favs.length; y++){
                    if(Array[x].id == favs[y].uid){
                        Array[x].fav = true
                    }
                }
            }
            setData(Array)
            setAll(false)
            setPage(0)
        }
    }
    const handelClick = (key) => {
        if(key == open){
            setOpen(null)
        }else{
            setOpen(key)
        }
    }
    const addFavs = async (name, _id)=>{
        await addFav(currentUser.uid, _id, name)
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
                        <FaStar className={open==key ? styles.listStar : styles.listStarTurn} onClick={()=> addFavs(value.data.nome, value.id)} style={value.fav==true ? {color: 'rgb(255, 204, 0)'}: {}}/>
                        {open == key && (<BsQuestionCircle className={styles.question}/>)}
                        <a className={styles.listName} style={open==key ? {left: '80px'} : {}}>{value.data.nome}</a>
                        <div onClick={()=>{handelClick(key)}} className={styles.listArrow} >
                            <MdPlayArrow className={open==key ? styles.arrowTurn : styles.arrow}/>
                        </div>
                    </div>
                    {open==key && (
                        <div className={styles.description}>
                            <p>{value.data.descricao}</p>                        
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