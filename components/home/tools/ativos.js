import styles from "../styles/tools/ativos.module.css"
import {FaSearch, FaStar} from 'react-icons/fa'
import {MdPlayArrow} from 'react-icons/md'
import { useState, useEffect } from "react"
import { queryMed } from "../../../lib/api/storeMed"
import AtivosSugest from "./ativosSugest"

export default function Ativos(){
    const [wordEntered, setWordEntered] = useState('')
    const [detail, setDetail] = useState(true)
    const [data, setData] = useState([])
    const [open, setOpen] = useState()

    useEffect(()=>{
        const op = localStorage.getItem('search')
        const da = localStorage.getItem('data')
        if(op) setWordEntered(op)
        if(da) setData(JSON.parse(da))
      },[])
    useEffect(()=>{
    localStorage.setItem('search', wordEntered)
    localStorage.setItem('data', JSON.stringify(data))
    })

    const handleChange = (e) => {
        setWordEntered(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(wordEntered){
            const DATA = await queryMed(wordEntered)
            setData(DATA)
        }  
    }
    const handelClick = (key) => {
        if(key == open){
            setOpen(null)
        }else{
            setOpen(key)
        }
    }
    const clear = () => {
        setData('')
        localStorage.setItem('data', data)
        setWordEntered('')
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
            {data && (
                <div className={styles.filters}>
                    <a className={styles.limpar} onClick={clear}>Limpar</a>
                </div>
            )}
            {data ? data.slice(1,10).map((value, key)=>{ return(
                <div className={styles.tableContainer} style={open==key ? {'height': '150px'} : {'height': '50px'}}>
                    <ul>
                        <li className={styles.list} key={key}>
                            <div className={open==key ? styles.listStar : styles.listStarTurn}>
                                <FaStar/>
                            </div>
                            <div className={styles.listName}>
                                <a>{value['name']}</a>
                            </div>  
                            <div onClick={()=>{handelClick(key)}} className={styles.listArrow} >
                                <MdPlayArrow className={open==key ? styles.arrowTurn : styles.arrow}/>
                            </div>
                            {open==key && (
                                <div>
                                    {value['description']}
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
                )
            }) : (
                <AtivosSugest/>
            )}
        </div>
    )
}