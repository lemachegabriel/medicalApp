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

   const Login = async () => {
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
      <Modal show={log} onHide={()=> setLog(false)} size="lg">
         <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
               Login
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row>
               <Col>
                  <div className={styles.login_loginInputEmail}>
                     <MdEmail />
                     <input
                        type="email"
                        placeholder="Digite um email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                  </div>
               </Col>
            </Row>
            <Row>
               <Col xs lg="2">
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
               </Col>
            </Row>
         </Modal.Body>
      </Modal> 
      
   )
}
export default Login