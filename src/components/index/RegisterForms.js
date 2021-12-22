import React, { useState } from 'react'
import { registerUser, redirect } from '../../lib/api/register'
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff, HiAtSymbol } from "react-icons/hi"
import styles from "../styles/register.module.css"
import Select from "react-select";
import { Modal } from 'react-bootstrap'



function Register({setReg, reg}) {
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [show, setShow] = useState(false)
   const [error, setError] = useState("")
   const [selMed, setSelMed] = useState()
   

   const options = [
       {label: "Médico", value:1},
       {label: "Nutricionista", value:2},
       {label: "Veterinario", value:3}
   ]

   const handleClick = (e) => {
      e.preventDefault() 
      setShow(!show);
   }
   
   const handleSelectChange = (e) => {
      setSelMed(e)
   }
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

   const register = async () => {
      const job = selMed['value']
      if(validate()){
         const data = await createUserWithEmailAndPassword(auth, email, password)
         if(data){
            setError(data.error)
         }
      } 
   }
   const redirect_login = () => {
      redirect()
    }

   return (
      <Modal show={reg} onHide={()=> setReg(false)} dialogClassName={styles.modal} size='sm'>
         <Modal.Header>
            <div className={styles.title}> 
               <h1>Registre-se</h1>
            </div>
         </Modal.Header>
         
         <div className={styles.register_right}>
            
            <div style={{ fontSize: 12, color: "red" }}>{error}</div>
            <div className={styles.register_registerInputName}>
               <HiAtSymbol/>
               <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
               />
            </div>
            <div className={styles.register_registerInputEmail}>
               <MdEmail />
               <input
                  type="email"
                  placeholder="Digite um email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>

            <div className={styles.register_registerInputPassword}>
               <MdLock />
               <input
                  placeholder="Digite sua senha"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
               <div className={styles.register_eye}>
                  {show ? (
                     <HiEye
                        size={20}
                        onClick={handleClick}
                     />
                  ) : (
                        <HiEyeOff
                           size={20}
                           onClick={handleClick}
                        />
                     )}
               </div>
            </div>
            <div className={styles.SelectPro}>
               <Select
                  className={styles.Select}
                  classNamePrefix={styles.Select}
                  options={options} 
                  placeholder='Selecione sua área de trabalho'
                  onChange={handleSelectChange}
               />
            </div>
            <div onClick={register} className={styles.register_but}>
               <a >Registrar</a>
            </div> 
            <a className={styles.login} onClick={() => {setReg(false)}}>Já tenho conta!</a>
         </div>
      </Modal>
      
   )
}
export default Register