import React, {useState, useEffect} from 'react'
import styles from './styles/register.module.css'
import router from 'next/router'
import InputMask from "react-input-mask"
import {useAuth} from '../contexts/authContext'

export default function register() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [tel, setTel] = useState('')
    const [job, setJob] = useState('')
    const [error, setError] = useState({error:'', field:''})
    const {singup, currentUser, createUser} = useAuth()
    
    const SingUp = async () => {
        if(validate()){
            await singup(email, confirmPassword)
            .then((res)=> {
                createUser(res.user.uid, name, tel, job)
                router.push('/home')
            }).catch((error)=> {
                if(error.message == 'Firebase: Error (auth/invalid-email).'){ message = {message: 'Digite um email válido', error: true};}
                else if(error.message == 'Firebase: Error (auth/email-already-in-use).') {message = {message: 'Este email já esta em uso', error: true}; console.log('gsdg')}
                else message = {message: 'Houve um erro ao criar o cadastro, tente mais tarde', error: true};
            })
        }
    }

    const validate = () => {
        const emailRegex =  /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        const emailConfirm = emailRegex.test(email)
        if(!emailConfirm){ setError({error: 'Digite um email válido', field: 'email'}); return false}

        if(name == ''){ setError({error: 'Nome não pode ser em branco', field: 'name'}); return false}

        const telRegex = /[0-9]/
        if(tel == ''){ setError({error: 'Digite um número valido', field: 'tel'}); return false}
        for(let x in tel){
            if(telRegex.test(tel[x]) || tel[x] == '(' || tel[x] == ')' || tel[x]=='-') continue
            else { setError({error: 'Digite um número valido', field: 'tel'}); console.log(false); return false; }
        }

        if(job == ''){ setError({error: 'Selecione uma profissão', field: 'job'}); return false}

        const passwordRegex = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/
        const passwordConfirm = passwordRegex.test(password)
        if (!passwordConfirm){ setError({error: 'Senha deve conter no mínimo 6 dígitos e 1 número', field: 'password'}); return false}
        if (confirmPassword != password){ setError({error: 'As senhas devem ser iguais', field: 'Conpassword'}); return false}

        return true
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
                        <h2>Crie sua conta</h2>
                        {error.field == 'email' && (
                            <div style={{ fontSize: 15, color: "red", fontFamily: 'Poppins, sans-serif' }}>{error.error}</div>
                        )}
                        <div className={styles.inputs}>
                            <label>Email:</label>
                            <input placeholder='Digite seu email de trabalho' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        {error.field == 'name' && (
                            <div style={{ fontSize: 15, color: "red", fontFamily: 'Poppins, sans-serif' }}>{error.error}</div>
                        )}
                        <div className={styles.inputs}>
                            <label>Nome:</label>
                            <input placeholder='Digite seu nome completo' value={name} onChange={(e)=>setName(e.target.value)}></input>
                        </div>
                        {error.field == 'tel' && (
                            <div style={{ fontSize: 15, color: "red", fontFamily: 'Poppins, sans-serif' }}>{error.error}</div>
                        )}
                        <div className={styles.inputs}>
                            <label>Telefone:</label>
                            <InputMask mask='(99)99999-9999' onChange={(e)=>setTel(e.target.value)} value={tel} placeholder='Digite seu tel com DDD'/>
                        </div>
                        {error.field == 'job' && (
                            <div style={{ fontSize: 15, color: "red", fontFamily: 'Poppins, sans-serif' }}>{error.error}</div>
                        )}
                        <div className={styles.select}>
                            <label>Profissão:</label>
                            <select onChange={(e)=>setJob(e.target.value)} >
                                <option value="" disabled selected>Selecione sua profissão</option>
                                <option value='Médico'>Médico</option>
                                <option value='Biomédico'>Biomédico</option>
                                <option value='Nutricionista'>Nutricionista</option>
                                <option value='Veterinário'>Veterinário</option>
                                <option value='Farmacêutico'>Farmacêutico</option>
                            </select>
                        </div>
                        {error.field == 'password' && (
                            <div style={{ fontSize: 15, color: "red", fontFamily: 'Poppins, sans-serif', paddingTop: '20px'}}>{error.error}</div>
                        )}
                        <div className={styles.inputs}>
                            <label>Senha:</label>
                            <input placeholder='Digite sua senha' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        {error.field == 'Conpassword' && (
                            <div style={{ fontSize: 15, color: "red", fontFamily: 'Poppins, sans-serif' }}>{error.error}</div>
                        )}
                        <div className={styles.inputs}>
                            <label>Confime sua senha:</label>
                            <input placeholder='Digite novemente sua senha' type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                        </div>
                        <button className={styles.regButton} onClick={SingUp} type='button'>Cadastrar</button>
                        <span>
                            Já tem uma conta?
                            <a onClick={()=> router.push('/login')}>   Log In</a>
                        </span>
                    </form>
                </div>
                <div className={styles.sideBarImg}></div>
            </div>
        </div>
    )
}
