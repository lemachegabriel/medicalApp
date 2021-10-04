import Problems from "../../components/problems"
import styles from '../styles/style.module.css'
import MedTable from "../../components/medController/medTable"

export default function home(){
    return(
        <h1>
            <div className={styles.style}>
                <MedTable></MedTable>
            </div>
        </h1>
    )
}