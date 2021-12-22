import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from "../../lib/firebase"


export function singUp(email, password){
  let message = ''
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    message = userCredential.user;
  })
  .catch((error) => {
    message = error.message;
  });
  return message
}

export function logIn(email, password){
  let message = ''
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    message = userCredential.user;
  })
  .catch((error) => {
    message = error.message;
  });
  return message
}

export function logOut(){
  let message = ''
  signOut(auth).then(() => {
    // Sign-out successful.
    message = 'logout'
  }).catch((error) => {
    message = error.message
  });
}

export function verify_user_logIn(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user)
    } else {
      console.log('nao logado')
    }
  });
}