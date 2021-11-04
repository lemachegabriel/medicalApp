import { verify_cookie_auth } from '../lib/api/auth'
import React from "react";
import Menu from '../components/home/navBar';
import SideBar from '../components/home/sideBar'
const initialState = {
    name:'',
    email:'',
    auth:''
}
class UserInfo extends React.Component{
    state = initialState
    
    validate = async () => {
        const data = await verify_cookie_auth()
        if(data['auth']){
            this.setState({name: data['user']['name']})
            return true
        }else{
            return false
        }        
    } 
    componentDidMount(){
        this.validate()
    }

    render() {
            return(
                <>
                <Menu></Menu>
                <SideBar></SideBar>
                </>
            )
        }
    
}
export default UserInfo