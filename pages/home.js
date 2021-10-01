import SearchBar from '../components/Search'
import styles from './styles/style.module.css'

export default function home(){
    
    return(
        <h1>
            <div className={styles.style}>
                <SearchBar></SearchBar>
            </div>
        </h1>
    )
}