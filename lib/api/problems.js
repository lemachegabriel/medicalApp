import axios from 'axios'
axios.defaults.withCredentials = true
import { url } from '../config';

export const createPro = async (name, description) => {
  let message = ""
  await axios.post(`${url}/problems/create`, {name, description}, {withCredentials: true})
  .then((result) => {
    message = result.data
  })
  .catch((error) => {
    if(error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      message = error.response.data
    }})
    return message
}

export const addMed = async (name, _id, problemId) => {
    let message = ""
    await axios.post(`${url}/problems/add`, {name, _id, problemId}, {withCredentials: true})
    .then((result) => {
      message = result.data
    })
    .catch((error) => {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        message = error.response.data
      }})
      return message
  }

export const delPro = async (_id, problemId) => {
    let message = ""
    await axios.post(`${url}/problems/del`, {_id, problemId}, {withCredentials: true})
    .then((result) => {
      message = result.data
    })
    .catch((error) => {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        message = error.response.data
      }})
      return message
  }

export const indexPro = async () => {
  let message = ""
  await axios.get(`${url}/problems/index`, {withCredentials: true})
  .then((result) => {
    message = result.data
  })
  .catch((error) => {
    console.log(error.response.data)
  })
  return message
}
