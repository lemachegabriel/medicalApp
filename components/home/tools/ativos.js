import styles from "../styles/tools/ativos.module.css"
import {FaSearch, FaStar} from 'react-icons/fa'
import {MdPlayArrow} from 'react-icons/md'
import { useState, useEffect } from "react"
import { queryMed } from "../../../lib/api/storeMed"
import AtivosSugest from "./ativosSugest"
import {BsQuestionCircle} from 'react-icons/bs'

export default function Ativos(){
    const [wordEntered, setWordEntered] = useState('')
    const [data, setData] = useState('')
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
                <div className={styles.tableContainer} style={open==key ? {minHeight: '100px'} : {minHeight: '50px'}}> 
                    <div className={open==key ? styles.listHeaderTurn : styles.listHeader}>
                        <FaStar className={open==key ? styles.listStar : styles.listStarTurn}/>
                        {open == key && (<BsQuestionCircle className={styles.question}/>)}
                        <a className={styles.listName} style={open==key ? {left: '80px'} : {}}>{value['name']}</a>
                        
                        <div onClick={()=>{handelClick(key)}} className={styles.listArrow} >
                            <MdPlayArrow className={open==key ? styles.arrowTurn : styles.arrow}/>
                        </div>
                    </div>
                    {open==key && (
                        <div className={styles.description}>
                            <p>
                            Carcinina) é um ativo que tem como objetivo o controle glicêmico e a 
                            melhora da resposta a secreção de insulina, diminuição da formação 
                            dos AGES, do estresse de retículo endoplasmático e estresse oxidati-
                            vo. Estudos mostram que Glycoxil® diminui os parâmetros inflamató-
                            rios, como: PCR (proteína C reativa), ácido úrico e ferritina proteína C reativa), ácido úrico e ferritina proteína C reativa), ácido úrico e 
                            </p>                        
                        </div>
                    )}     
                </div>
                )
            }) : (
                <AtivosSugest/>
            )}
        </div>
        
    )
}