import { registerUser } from '../lib/api/register';
import React from 'react';

const initialState = {
    name: '',
    email:'',
    password:'',
    errorMessage:''
}

class RegisterForm extends React.Component {
    state = initialState
    
    handleChange = event =>{
        this.setState({ [event.target.name]: event.target.value })
    }

    validate = () => {
        let Message = ""

        if(this.state.password.length <= 8){
            Message = "Insira uma senha com 8 caracteres ou mais "
        }
        if(!this.state.password){
            Message = "Senha não pode ser em branco"
        }
        if(!this.state.name){
            Message = "Nome não pode ser em branco"
        }
        if(!this.state.email.includes("@") || !this.state.email.includes(".")){
            Message = "Insira um email valido"
        }
        if(Message){
            this.setState({errorMessage:Message})
            return false
        }
        return true
    }

    handleSubmit = async event =>{
        let { name, email, password } = this.state
        
        event.preventDefault()
        const isValid = this.validate()
        if(isValid){
            const data = await registerUser(name, email, password)
            if(data["errorStatus"] == 400){
                this.setState({errorMessage : data["message"]['error']})
                data.error = this.state.errorMessage
            }
        }
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.errorMessage}
                    </div>
                    <input type="name" 
                    name="name"
                    placeholder="nome"
                    onChange={this.handleChange}
                    />
                </div>
                <div><input 
                    name="email"
                    placeholder="email"
                    onChange={this.handleChange}
                /></div>
                <div><input type="password"
                    name="password"
                    placeholder="senha"
                    onChange={this.handleChange}
                /></div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default RegisterForm
