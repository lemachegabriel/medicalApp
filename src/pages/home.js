import { verify_cookie_auth } from '../lib/api/auth'
import styles from './styles/style.module.css'
import router from 'next/router'
import { useState, useEffect } from 'react'
import Menu from '../components/home/navBar'
import SideBar from '../components/home/sideBar'

export default function UserInfo(){
    const [passed, setPassed] = useState(true) 
    const [User, setUser] = useState('teste')
     
    // const validate = async () => {
    //      await verify_cookie_auth()
    //      .then((res)=>{
    //         if(res['auth'] == false){
    //             setPassed(false)
    //             router.push('/')
    //         }else{ 
    //             setPassed(true)}
    //             const name = res['user']['name']
    //             setUser(name)
    //      })  
    // }
      
    // useEffect(()=> {
    //     validate()
    // })

    return(
        <>
        {passed && (
            <>
            <div className={styles.mainContainer}>
                <Menu userData={User} />
                <SideBar/>
            </div>
            </>
        )}
        </> 
    ) 
}
