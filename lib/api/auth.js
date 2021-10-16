import axios from 'axios'
import Router from 'next/router';
axios.defaults.withCredentials = true
import { url } from '../config';

export const loginUser = async (email, password) => {

  let message = ""
  await axios.post(`${url}/api/auth`, { email, password }, {withCredentials: true})
  .then((result) => {
    Router.push('/home')
  })
  .catch((error) => {
    if(error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      message = error.response.data
    }})
    return message
}
export const redirect = () =>{
  Router.push('/registro')
}