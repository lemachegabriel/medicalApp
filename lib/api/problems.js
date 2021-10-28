import axios from 'axios'
axios.defaults.withCredentials = true
import { url } from '../config';

export const createPro = async (name) => {
  let message = ""
  await axios.post(`${url}/problems/create`, name, {withCredentials: true})
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

export const addMedPro = async (name, _id, problemId) => {
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

export const delMedPro = async (problemId) => {
    let message = ""
    await axios.post(`${url}/problems/delMed`, {problemId}, {withCredentials: true})
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

export const queryPro = async (name) => {
  let message = ""
  await axios.post(`${url}/problems/query`, {name}, {withCredentials: true})
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

export const delPro = async (_id) => {
  let message = ""
  await axios.get(`${url}/problems/delPro/${_id}`)
  .then((result) => {
    message = result.data
  })
  .catch((error) => {
    console.log(error.response.data)
  })
  return message
}

export const update = async (_id, data) => {
  let message = ""
  await axios.post(`${url}/problems/update/${_id}`, data)
  .then((result) => {
    message = result.data
  })
  .catch((error) => {
    console.log(error.response.data)
  })
  return message
}

