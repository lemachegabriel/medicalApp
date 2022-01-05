import styles from '../styles/tools/doencasSugest.module.css'
import {MdOutlineMedicalServices} from 'react-icons/md'
import {AiOutlineDoubleRight} from 'react-icons/ai'


export default function DoencasSugest(){
    const sugestionsCa = [{'name': 'Redução de cortisol'}, {'name': 'M0oduladores de insulina'}, {'name': 'Foco e energia concentrada'}, {'name': 'Manutenção da saúde muscular'}, 
    {'name': 'Pré-treino'}, {'name': 'Reposição de Cálcio'}, {'name': 'Firmador e Drenante'}]

    const getMed = async (e)=> {
        const DATA = await queryID(e.target.id)
        setDataMed(DATA)
    }
    return(
        <div className={styles.containerSugs}>
            <div className={styles.headSugs}>
                <MdOutlineMedicalServices/>
                <a>Patologias mais pesquisadas:</a>
            </div>
            <div className={styles.sugestions}>
                {sugestionsCa.map((value, key)=> {return(
                    <div className={styles.sugsLines}>
                        <a id={key} >{value.name}</a>
                        <AiOutlineDoubleRight id={key} />
                    </div>
                )})}
            </div>
        </div>
    )
}