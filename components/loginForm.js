import React, { useState } from 'react'
import { loginUser, redirect } from '../lib/api/auth';
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import styles from "./styles/login.module.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, InputGroup, FormControl, Form, Modal } from "react-bootstrap";

function Login({setLog, log}) {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [show, setShow] = useState(false)
   const [error, setError] = useState("")
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

   const login = async () => {
      console.log(error)
      if(validate()){
         const data = await loginUser(email, password)
         if(data){
            setError(data.error)
         }
      }
      
   }
   const redirect_register = () => {
      redirect()
    }

   return (
      <Modal show={log} onHide={()=> setLog(false)} dialogClassName={styles.modal} size='sm'>
         <Modal.Header>
            <h1 className={styles.title}>Login</h1>
         </Modal.Header>
         <Modal.Body>
            <div className={styles.login_right}>
               <div style={{ fontSize: 12, color: "red" }}>{error}</div>
               <div className={styles.login_loginInputEmail}>
                  <MdEmail />
                  <input
                     type="email"
                     placeholder="Digite seu email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                  />
               </div>
         
               <div className={styles.login_loginInputPassword}>
                  <MdLock />
                  <input
                     placeholder="Digite sua senha"
                     type={show ? "text" : "password"}
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                  />
                  <div className={styles.login_eye}>
                     {show ? (
                        <HiEye size={20} onClick={handleClick}
                        />
                     ) : (
                           <HiEyeOff size={20} onClick={handleClick}/>
                        )}
                  </div>
               </div>
               <div onClick={login} className={styles.login_loginBut}>
                  <a >Entrar</a>
               </div> 
               <a className={styles.create} onClick={redirect_register}>Criar nova conta </a>
               
            </div>
         </Modal.Body>
      </Modal> 
      
   )
}
export default Login