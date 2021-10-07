import SearchBar from '../components/Search'
import styles from './styles/style.module.css'
import { useRouter } from 'next/router'


export default function home(){
    
    return(
        <div className="{styles.style}">
            <SearchBar>
               
            </SearchBar>
        </div>

    )
}