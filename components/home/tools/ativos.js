import styles from "../styles/tools/ativos.module.css"
import {FaSearch, FaStar} from 'react-icons/fa'
import { useState } from "react"
import { queryMed } from "../../../lib/api/storeMed"

export default function Ativos(){
    const [wordEntered, setWordEntered] = useState('')

    const handleChange = (e) => {
        setWordEntered(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(wordEntered){
            await queryMed(wordEntered)
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
            
            <div className={styles.tableContainer}>
                <ul>
                    <li className={styles.list}>
                        <div className={styles.listStar}>
                            <FaStar/>
                        </div>
                        <div className={styles.listName}>
                            <a>Aspirina</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
