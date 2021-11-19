import styles from "../styles/tools/ativos.module.css"
import {FaSearch, FaStar} from 'react-icons/fa'
import {MdPlayArrow} from 'react-icons/md'
import { useState, useEffect } from "react"
import { queryMed } from "../../../lib/api/storeMed"

export default function Ativos(){
    const [wordEntered, setWordEntered] = useState('')
    const [detail, setDetail] = useState(false)
    const [data, setData] = useState([])
    
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
            
            {data.slice(1,6).map((value, key)=>{
                return(
                    <div className={styles.tableContainer}>
                    <ul>
                        <li className={styles.list} key={key}>
                            <div className={styles.listStar}>
                                <FaStar/>
                            </div>
                            <div className={styles.listName}>
                                <a>{value['name']}</a>
                            </div>  
                            <div onClick={()=>setDetail(!detail)} className={styles.listArrow} >
                                <MdPlayArrow />
                            </div>
                        </li>
                    </ul>
                    </div>
                )
            })}
        </div>
    )
}
