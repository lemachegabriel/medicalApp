import React from "react"
import { storeMed } from "../../lib/api/storeMed"

const initialState = {
    name: "",
    description: "",
    errorMessage: "",
    medico: false,
    nutricionista: false,
    veterinario: false,
    farmaceutico: false 
  };
class AddMed extends React.Component {
    state = initialState
    

    handleChange = event =>{
        this.setState({ [event.target.name]: event.target.value })
    }
    handleCheckChange = event =>{
        this.setState({[event.target.name]: event.target.checked})
        console.log(this.state)
    }
    validate = () => {
        let Message = ""
        if(!this.state.name || !this.state.description){
            Message = "Os campos não podem estar em branco"
        }
        if(Message != ""){
            this.setState({errorMessage:Message})
            return false
        }
        return true
    }

    handleSubmit = async event =>{
        let {name, description, medico, farmaceutico, veterinario, nutricionista} = this.state
        console.log(name)
        event.preventDefault()
        const isValid = this.validate()
        if(isValid){
            const data = await storeMed(name, description, medico, farmaceutico, veterinario, nutricionista)
            console.log(name)
            if(data){
                this.setState({errorMessage:data.error})
                console.log(data.error)
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
                    <input 
                    name="name"
                    placeholder="nome"
                    onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input
                    name="description"
                    placeholder="descrição"
                    onChange={this.handleChange}
                    />
                </div>
                <div>
                    <table className="table">
                        <tr>
                            <input name="medico" type="checkbox" defaultChecked={false} onChange={this.handleCheckChange}/>
                            <th>medico</th>
                        </tr>
                        <tr>
                            <input name="nutricionista" type="checkbox" onChange={this.handleCheckChange}/>
                            <th>nutricionista</th>
                        </tr>
                        <tr>
                            <input name="veterinario" type="checkbox" onChange={this.handleCheckChange}/>
                            <th>veterinario</th>
                        </tr>
                        <tr>
                            <input name="farmaceutico" type="checkbox" onChange={this.handleCheckChange}/>
                            <th>farmaceutico</th>
                        </tr>
                    </table>

                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default AddMed