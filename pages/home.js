import SearchBar from '../components/Search'
import styles from './styles/style.module.css'
import { useRouter } from 'next/router'
import { verify_cookie_auth } from '../lib/api/auth'

export default function home(){
    
    return(
        <button onClick={verify_cookie_auth}>verify</button>
    )
}
