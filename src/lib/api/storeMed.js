import axios from 'axios'
axios.defaults.withCredentials = true
import { url } from '../config';

export const storeMed = async (data) => {
  let message = ""
  await axios.post(`${url}/medcines/medicines`, data, {withCredentials: true})
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

export const updateMed = async (id, data) => {
  let message = ""
  await axios.put(`${url}/medcines/medicines/${id}`, data, {withCredentials: true})
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

export const indexMed = async () => {
  let message = ""
  await axios.get(`${url}/medcines/medicines`, {withCredentials: true})
  .then((result) => {
    message = result.data
  })
  .catch((error) => {
    console.log(error.response.data)
  })
  return message
}

export const queryID = async (id) => {
  let message = ""
  await axios.get(`${url}/medcines/show/${id}`, {withCredentials: true})
  .then((result) => {
    message = result.data
  })
  .catch((error) => {
    console.log(error.response.data)
  })
  return message
}

export const queryMed = async (name) => {
  let message = ""
  await axios.post(`${url}/medcines/query`, {name}, {withCredentials: true})
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

export const delMed = async (id) => {
  let message = ""
  await axios.get(`${url}/medcines/del/${id}`)
  .then((result) => {
    message = result.data
  })
  .catch((error) => {
    console.log(error.response.data)
  })
  return message
}

export const addFav = async (name, _id, userId) => {
  let message = ""
  await axios.post(`${url}/api/addFav`, {name, _id, userId}, {withCredentials: true})
  .then((result) => {
    message = result.data
  })
  .catch((error) => {
    if(error.response) {
      // console.log(error.response.data);
      // console.log(error.response.status);
      message = error.response.data
    }})
    return message
}