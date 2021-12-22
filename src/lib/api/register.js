import axios from 'axios'
import Router from 'next/router';
axios.defaults.withCredentials = true
import { url } from '../config';

export const registerUser = async (name, email, password, job) => {

  let message, errorStatus
  await axios.post(`${url}/api/register`, { name, email, password, job }, {withCredentials: true})
  .then((result) => {
    message = result.data
    Router.push('/home')
  })
  .catch((error) => {
    if(error.response) {
      message = error.response.data
      errorStatus = error.response.status
    }})
  return {message, errorStatus }
}

export const redirect = () =>{
  Router.push('/')
}
