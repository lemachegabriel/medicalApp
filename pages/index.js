import LoginForm from '../components/loginForm'

import { useRouter } from 'next/router'

export default function index(){
    const router = useRouter()

    const redirect_register = () => {
        router.push('/register')
    }
    return(    
        <LoginForm></LoginForm>
    )
}