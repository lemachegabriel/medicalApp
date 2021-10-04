import LoginForm from '../components/loginForm'
import { useRouter } from 'next/router'
import style from './styles/home.module.css'
export default function index(){
    return(
            <div className={style.master_page}>
                <div className={style.menu_bar}>
                    <a>Logo</a>
                    <button >registre</button>
                    <button>login</button>
                </div>
                <div className={style.home_section}>

                </div>
            </div>
    )
}