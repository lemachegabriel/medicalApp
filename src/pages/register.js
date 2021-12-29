import React, {useState} from 'react'
import styles from './styles/register.module.css'
import Select from "react-select";

export default function register() {
    const [selMed, setSelMed] = useState()
    const options = [
        {label: "Médico", value:1},
        {label: "Nutricionista", value:2},
        {label: "Veterinario", value:3}
    ]
    const handleSelectChange = (e) => {
        setSelMed(e)
     }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <img className={styles.logo} src='/img/logo.svg'/>
            </div>
            
            <div className={styles.container}>
                <h1>Registre-se na Activus</h1>
                <div className={styles.form}>
                    <div className={styles.fields}>
                        <form>
                            <label>Nome:</label>
                            <input placeholder='Digite seu primeiro nome'></input>
                        </form>
                    </div>
                    <div className={styles.fields}>
                        <form>
                            <label>Sobrenome:</label>
                            <input placeholder='Digite seu último nome'></input>
                        </form>
                    </div>
                    <div className={styles.fields} >
                        <form>
                            <label>Email:</label>
                            <input placeholder='Digite seu email'></input>
                        </form>
                    </div>
                    <div className={styles.fields}>
                        <form>
                            <label>Telefone:</label>
                            <input placeholder='Digiter seu tel com o DDD'></input>
                        </form>
                    </div>
                    <div className={styles.selectForm}>
                    <select id="standard-select">
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                        <option value="Option 4">Option 4</option>
                        <option value="Option 5">Option 5</option>
                        
                    </select>
                    </div>
                    <div className={styles.fields} >
                        <form>
                            <label>Senha:</label>
                            <input placeholder='Digite uma senha'></input>
                        </form>
                    </div>
                    <div className={styles.fields} >
                        <form>
                            <label>Repita senha:</label>
                            <input placeholder='Repita senha escrita'></input>
                        </form>
                    </div>
                    <a>Registrar</a>
                </div>
                
            </div>
        </div>
    )
}
