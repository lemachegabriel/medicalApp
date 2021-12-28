import React from 'react'
import styles from './styles/register.module.css'

export default function teste() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.register}>
                    <form>
                        <img className={styles.logo} src='/img/logo.svg' style={{width: '200px'}}/>
                        <h2>Crie sua conta</h2>
                        <div className={styles.inputs}>
                            <label>Email:</label>
                            <input placeholder='Digite seu email de trabalho'></input>
                        </div>
                        <div className={styles.inputs}>
                            <label>Nome:</label>
                            <input placeholder='Digite seu nome'></input>   
                        </div>
                        <div className={styles.inputs}>
                            <label>Sobrenome:</label>
                            <input placeholder='Digite seu sobrenome'></input>   
                        </div>
                        <div className={styles.inputs}>
                            <label>Telefone:</label>
                            <input placeholder='Digite seu tel com DDD'></input>   
                        </div>
                        <div className={styles.select}>
                            <label>Profissão:</label>
                            <select>
                                <option value="" disabled selected>Selecione sua profissão</option>
                                <option value='0'>médico</option>
                                <option value='1'>biomedico</option>
                                <option value='2'>nutricionista</option>
                                <option value='3'>veterinario</option>
                            </select>
                        </div>
                        <div className={styles.inputs}>
                            <label>Senha:</label>
                            <input placeholder='Digite uma senha'></input>   
                        </div>
                        <div className={styles.inputs}>
                            <label>Confime sua senha:</label>
                            <input placeholder='Digite novemente sua senha'></input>   
                        </div>
                        <button className={styles.regButton}>Cadastrar</button>
                        <span>
                            Já tem uma conta? 
                            <a>   Log In</a>
                        </span>
                    </form>
                </div>
                <div className={styles.sideBarImg}></div>
            </div>
            
        </div>
    )
}
