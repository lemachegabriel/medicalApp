import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { loginUser } from '../lib/api/auth';
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import styles from "./styles/login.module.css"

function Login() {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [show, setShow] = useState(false)

   const handleClick = (e) => {
      e.preventDefault()
      setShow(!show);
   }

   const Login = async () => {
      await loginUser(email, password)
   }
   const redirect_register = () => {
      const router = useRouter()
      router.push('/register')
    }

   return (
      <div className={styles.login}>
         <div className={styles.login_right}>
            <h1>Acessar App</h1>

            <div className={styles.login_loginInputEmail}>
               <MdEmail />
               <input
                  type="email"
                  placeholder="Digite um email"
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

            <button onClick={Login}>
               Entrar
            </button>

            <h4>Não tenho conta!</h4>

            <button onClick={redirect_register}>
               Cadastrar
            </button>
         </div>
      </div>
   )
}

export default Login