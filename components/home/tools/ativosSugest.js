import styles from '../styles/tools/ativosSugest.module.css'
import {CgPill} from 'react-icons/cg'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import React, { useState } from 'react'

export default function AtivosSugest(){
    const [showDesc, setShowDesc] = useState()
    const sugestions = [{'name': 'Bio-Arct', 'id': '1'}, {'name': 'Exsynutriment', 'id': '2'}, {'name': 'AFAsfasfasf'}, {'name': 'Hanag'}, 
    {'name': 'JAjJajf'}, {'name': 'IOoaifoas'}, {'name': 'jaksfjak'}]

    const description = (e)=>{
        setShowDesc(e.target.id)
    }
    return(
        <>
        <div className={styles.container}>
            <div className={styles.head}>
                <CgPill/>
                <a>Ativos mais pesquisados:</a>
            </div>
            <div className={styles.sugestions}>
                {sugestions.map((value, key)=> {return(
                    <div className={styles.sugsLines}>
                        <a id={key} onClick={description}>{value.name}</a>
                        <AiOutlineDoubleRight id={key} onClick={description}/>
                    </div>
                )
                })}
            </div>
        </div>
        {showDesc && (
            <div className={styles.ativosDescription}>
                {sugestions[showDesc].name}
            </div>
        )}
        
        </>
    )
}