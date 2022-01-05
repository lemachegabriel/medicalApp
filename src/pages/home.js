import styles from './styles/style.module.css'
import router from 'next/router'
import { useState, useEffect } from 'react'
import Menu from '../components/home/navBar'
import SideBar from '../components/home/sideBar'
import {useAuth} from '../contexts/authContext'

export default function UserInfo(){
    const [passed, setPassed] = useState(false) 
    const [User, setUser] = useState('')
    const {getUser, currentUser} = useAuth()
   
    const validate = async () => {
        await getUser(currentUser.uid)
        .then((res)=>{
            const name = res.data().nome
            setUser(name.split(' ')[0]) 
        })
    }
    
    useEffect(()=> {
        if(!currentUser){
            router.push('/login')
        }else{
            validate()
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
