import Problems from "../../components/problems"
import styles from '../styles/style.module.css'


export default function home(){
    return(
        <h1>
            <div className={styles.style}>
                <Problems></Problems>
            </div>
        </h1>
    )
}