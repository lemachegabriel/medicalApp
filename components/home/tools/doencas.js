import styles from "../styles/tools/doencas.module.css"
import {FaSearch, FaStar} from 'react-icons/fa'
import { useState, useEffect } from "react"
import {AiOutlineDoubleRight} from 'react-icons/ai'

export default function Doencas(){
    const [wordEntered, setWordEntered] = useState('')
    const [dataCategoria, setDataCategoria] = useState()
    const [open, setOpen] = useState()
    const sugestions = [{'name': 'Redução de cortisol', 'id': '1'}, {'name': 'Moduladores de insulina'}, {'name': 'Foco e energia concentrada'}, {'name': 'Manutenção da saúde muscular'}, 
    {'name': 'Pré-treino'}, {'name': 'Reposição de Cálcio'}, {'name': 'Firmador e Drenante'}]

    useEffect(()=>{
        const op = localStorage.getItem('searchCategoria')
        const da = localStorage.getItem('dataCategoria')
        if(op) setWordEntered(op)
        if(da) setDataCategoria(JSON.parse(da))
      },[])
    useEffect(()=>{
    localStorage.setItem('searchCategoria', wordEntered)
    localStorage.setItem('dataCategoria', JSON.stringify(dataCategoria))
    })
    const handleChange = (e) => {
        setWordEntered(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(wordEntered){
            const DATA = await queryMed(wordEntered)
            setDataCategoria(DATA)
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
        setDataCategoria('')
        localStorage.setItem('dataCategoria', dataCategoria)
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
                        <input placeholder='Buscar categorias' value={wordEntered} onChange={handleChange}/>
                    </form>
                </div>
                <div className={styles.searchIcon} >
                    <FaSearch onClick={handleSubmit}/>
                </div>
            </div>
            {dataCategoria && (
                <div className={styles.filters}>
                    <a className={styles.limpar} onClick={clear}>Limpar</a>
                </div>
            )}
            {dataCategoria ? (
                <div>Conteudo pesquisa</div>
            ) : (
                <div className={styles.containerSugs}>
                    <div className={styles.headSugs}>
                        
                        <a>Categorias mais pesquisadas:</a>
                    </div>
                    <div className={styles.sugestions}>
                        {sugestions.map((value, key)=> {return(
                            <div className={styles.sugsLines}>
                                <a id={key} >{value.name}</a>
                                <AiOutlineDoubleRight id={key} />
                            </div>
                        )
                        })}
                    </div>
                </div>
            )}
        </div>

    )
}