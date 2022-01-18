import styles from './styles/style.module.css'
import router from 'next/router'
import { useState, useEffect } from 'react'
import Menu from '../components/home/navBar'
import SideBar from '../components/home/sideBar'
import {useAuth} from '../contexts/authContext'

export default function UserInfo(){
    const [passed, setPassed] = useState(false) 
    const [User, setUser] = useState('')
    const {currentUser} = useAuth()
    
    useEffect(()=> {
        if(!currentUser){
            router.push('/login')
        }else{
            const name = currentUser.data.nome
            setUser(name.split(' ')[0])
            setPassed(true)
        }
    })

    return(
        <>
        {passed && (
            <div className={styles.mainContainer}>
                <Menu userData={User}/>
                <SideBar/>
            </div>
        )}
        </> 
    ) 
}