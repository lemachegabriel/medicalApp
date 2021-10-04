import React, { useState } from 'react'
import { registerUser, redirect } from '../lib/api/register'
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff, HiAtSymbol } from "react-icons/hi"
import styles from "./styles/register.module.css"
import Select from "react-select";

function Register() {
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [show, setShow] = useState(false)
   const [error, setError] = useState("")

   const options = [
       {label: "Médico", value:"medico"},
       {label: "Nutricionista", value:"nutricionista"},
       {label: "Veterinario", value:"veterinario"}
   ]

   const handleClick = (e) => {
      e.preventDefault()
      setShow(!show);
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
      if(validate()){
         const data = await registerUser(name, email, password)
         if(data){
            setError(data.error)
         }
      }
      
   }
   const redirect_login = () => {
      redirect()
    }

   return (
      <div className={styles.register}>
         <div className={styles.register_right}>
            <h1>Acessar App</h1>
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
               <div className={styles.Selectname}>Profissão:</div>
                <Select options={options}>

                </Select>
            </div>
            <button onClick={register}>
               Registrar
            </button>
            <h4>Já tenho conta!</h4>
            <button onClick={redirect_login}>
               Login
            </button>
         </div>
      </div>
   )
}
export default Register