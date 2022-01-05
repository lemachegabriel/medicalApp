import React, {useState, useEffect} from 'react'
import styles from './styles/login.module.css'
import router from 'next/router'
import {useAuth} from '../contexts/authContext'

export default function login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {login, currentUser} = useAuth()
    
    const validate = () => {
        let Message = ""
        if(!password){
           Message = "Senha não pode ser em branco"
       }
       if(!email.includes("@") || !email.includes(".")){
           Message = "Insira um email valido"
       }
       if(Message != ""){
           setError(Message)
           return false
       }
       return true
    }
    const handleClick = async () => {
        if(validate()){
            await login(email, password)
            .then((res)=> {
                router.push('/home')
            }).catch((error)=> {
                console.log(error.message)
                if(error.message == 'Firebase: Error (auth/wrong-password).'){setError('Senha incorreta')}
                else if(error.message == 'Firebase: Error (auth/user-not-found).'){setError('Email não encontrado')}
            })
        }  
    } 
    
    useEffect(()=> {
        if(currentUser.uid){
            router.push('/home')
        }
    })

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.register}>
                    
                    <form>
                        <img className={styles.logo} src='/img/logo.svg' style={{width: '200px'}}/>
                        <h2>Entre na sua conta</h2>
                        <div style={{ fontSize: 15, color: "red", fontFamily: 'Poppins, sans-serif' }}>{error}</div>
                        <div className={styles.inputs}>
                            <label>Email:</label>
                            <input placeholder='Digite seu email de trabalho' value={email} onChange={e=>{setEmail(e.target.value)}}></input>
                        </div>
                        <div className={styles.inputs}>
                            <label>Senha:</label>
                            <input placeholder='Digite sua senha' type={'password'} value={password} onChange={e=>{setPassword(e.target.value)}}></input>   
                        </div>
                        <button className={styles.regButton} onClick={handleClick} type='button'>Log In</button>
                        <span>
                            Ainda não tem uma conta?
                            <a onClick={()=> router.push('/registro')}>   Cadastrar</a>
                        </span>
                        <div style={{height: '90px'}}></div>
                    </form>
                </div>
                    <div className={styles.sideBarImg}></div>
            </div>
        </div>
    )
}
