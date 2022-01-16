import React, { useContext, useState, useEffect } from "react"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from "../lib/firebase"
import { firestore } from "../lib/firebase";
import { getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(" ")
  const [loading, setLoading] = useState(true)

  function singup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function getUser(uid){
    const docRef = doc(firestore, 'usuarios', uid)
    return getDoc(docRef)
  }

  function createUser(uid, nome, tel, pro){
    return setDoc(doc(firestore, 'usuarios', uid), {
      nome: nome,
      tel: tel,
      profissao: pro
    })
  }

  function addFav(uid ,ativoId, nome){
    const docRef = doc(firestore, 'usuarios', uid)
    return updateDoc(docRef, {
      favoritos: arrayUnion({
        uid: ativoId,
        nome: nome
      })
    })
  }

  function removeFav(uid, ativoId, nome){
    const docRef = doc(firestore, 'usuarios', uid)
    return updateDoc(docRef, {
      favoritos: arrayRemove({
        uid: ativoId,
        nome: nome
      })
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if(user){
        setCurrentUser(user)
        setLoading(false)
      }else{
        setCurrentUser(false)
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    singup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    getUser,
    createUser,
    addFav,
    removeFav
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}