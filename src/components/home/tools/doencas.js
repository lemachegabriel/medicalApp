import { useState, useEffect } from "react"
import styles from "../styles/tools/doencas.module.css"
import {FaSearch, FaStar} from 'react-icons/fa'
import {MdPlayArrow} from 'react-icons/md'
import {BsQuestionCircle} from 'react-icons/bs'
import DoencasSugest from "./doencasSugest"
import {AiOutlineDoubleRight} from 'react-icons/ai'
import { useDoencas } from "../../../contexts/problemsContext"
import { useAtivos } from "../../../contexts/ativosContext"

export default function Doencas(){
    const [wordEntered, setWordEntered] = useState('')
    const [dataCategoria, setDataCategoria] = useState('')
    const [dataMed, setDataMed] = useState('')
    const [all, setAll] = useState(false)
    const [open, setOpen] = useState()
    const [page, setPage] = useState(0)
    const [uid, setUid] = useState('')
    const {getAll} = useDoencas()
    const {getAtivo} = useAtivos()
    
    useEffect(()=>{
        const op = localStorage.getItem('searchCategoria')
        const da = localStorage.getItem('dataCategoria')
        const al = localStorage.getItem('allCategoria')
        if(op) setWordEntered(op)
        if(da) setDataCategoria(JSON.parse(da))
        if(al == 'true') setAll(true)
        else setAll(false)
      },[])
    useEffect(()=>{
        localStorage.setItem('searchCategoria', wordEntered)
        localStorage.setItem('dataCategoria', JSON.stringify(dataCategoria))
        localStorage.setItem('allCategoria', all)
    })
    const handleChange = (e) => {
        setWordEntered(e.target.value)
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
            setDataCategoria(Array)
            setAll(false)
            setPage(0)
        }
    }
    const handelClick = (key) => {
        if(key == open){
            setOpen(null)
            setDataMed('')
        }else{
            setOpen(key)
            setDataMed('')
        }
    }
    const getAllPro = async ()=> {
        if(!all){
            const DATA = await getAll()
            const Array = []
            DATA.forEach(element => {
                Array.push({id: element.id, data : element.data()})
            })
            setAll(true)
            setDataCategoria(Array)
            setPage(0)
        }
    }
    const getMed = async (e)=> {
        setUid(e.target.id) 
        await getAtivo(e.target.id)
        .then((res) => {
            const DATA = res.data()
            setDataMed(DATA)
        }).catch((err) => {
            console.log(err)
        })
        
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
        setDataCategoria('')
        localStorage.setItem('dataCategoria', dataCategoria)
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
                        <input placeholder='Buscar patologias' value={wordEntered} onChange={handleChange}/>
                    </form>
                </div>
                <div className={styles.searchIcon} >
                    <FaSearch onClick={handleSubmit}/>
                </div>
            </div>
            
                <div className={styles.filters}>
                    <a className={styles.limpar} onClick={getAllPro} style={all ? {backgroundColor: '#8fcb3c', border:'none', color:'aliceblue', boxShadow:'rgba(68, 68, 68, 0.24) 0px 3px 8px 0px'} : {}}>Todas Patologias</a>
                    {dataCategoria && (
                        <a className={styles.limpar} onClick={clear}>Limpar</a>
                    )}
                </div>
            
            
            {dataCategoria ? dataCategoria.slice(0 + (page*8) ,8 + (page*8)).map((value, key)=>{ return(
                <>
                <div className={styles.tableContainer} style={open==key ? {minHeight: '100px'} : {minHeight: '50px'}}> 
                    <div className={open==key ? styles.listHeaderTurn : styles.listHeader}>
                        
                        {/* <FaStar className={open==key ? styles.listStar : styles.listStarTurn}/>
                        {open == key && (<BsQuestionCircle className={styles.question}/>)} */}
                        <a className={styles.listName}>{value.data.nome}</a>
                        <div onClick={()=>{handelClick(key)}} className={styles.listArrow} >
                            <MdPlayArrow className={open==key ? styles.arrowTurn : styles.arrow}/>
                        </div>
                    </div>
                    {open==key && value.data.ativos.map((med, keyMed)=>{ return(
                        <div id={keyMed} className={styles.description}>
                            <a id={med.uid} onClick={getMed} style={med.uid== dataMed['_id'] ? {color: ' #8fcb3c'} : {}}>{med.nome}</a>         
                            <AiOutlineDoubleRight/>
                        </div>  
                    )})                        
                    }
                    
                </div>
                {open==key && dataMed && (
                    <div className={styles.ativosDescription}>
                        <div className={styles.headDesciption}>
                            <BsQuestionCircle style={{color: "#8fcb3c"}}/>
                            <a>{dataMed['nome']}</a>
                            <FaStar className={styles.listStar} onClick={()=>addFavs(dataMed['nome'], dataMed['_id'])}/>
                        </div>
                        <div className={styles.descriptionBox}>
                            <div className={styles.descriptionText}>
                                <a>{dataMed['descricao']}</a>
                            </div>
                        </div>
                    </div>
                )}     
                </>
            )}) : (
                <DoencasSugest/>
            )}
            <div className={styles.pages}>
                {Array(Math.ceil(dataCategoria.length/8)).fill(1).map((value, key)=>{
                    return(
                        <a style={page==key ? {color: '#8fcb3c'} : {}} onClick={()=> setPage(key)}>{key+1}</a>    
                )})}
            </div>
        </div>

    )
}