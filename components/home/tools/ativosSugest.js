import styles from '../styles/tools/ativosSugest.module.css'
import {CgPill} from 'react-icons/cg'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import {BsQuestionCircle} from 'react-icons/bs'
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
            <>
            <div className={styles.ativosDescription}>
                <div className={styles.headDesciption}>
                    <BsQuestionCircle/>
                    <a>{sugestions[showDesc].name}</a>
                </div>
                <div className={styles.description}>
                    <div className={styles.descriptionText}>
                        <a>
                        Carcinina) é um ativo que tem como objetivo o controle glicêmico e a 
                        melhora da resposta a secreção de insulina, diminuição da formação 
                        dos AGES, do estresse de retículo endoplasmático e estresse oxidati-
                        vo. Estudos mostram que Glycoxil® diminui os parâmetros inflamató-
                        rios, como: PCR (proteína C reativa), ácido úrico e ferritina
                        </a>
                    </div>
                    <div className={styles.descriptionDosagem}>
                        <a>
                            Dosagem:
                        </a>
                    </div>
                </div>
            </div>
            <div style={{height: '20px', top: '180px', position: 'relative'}}></div>
            </>
        )}
        
        </>
    )
}