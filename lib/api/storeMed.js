import axios from 'axios'
axios.defaults.withCredentials = true
import { url } from '../config';

export const storeMed = async (name, description, medico, farmaceutico, veterinario, nutricionista) => {

  let message = ""
  await axios.post(`${url}/medcines/medicines`, {name, description, medico, farmaceutico, veterinario, nutricionista}, {withCredentials: true})
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
