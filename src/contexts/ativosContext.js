import { doc, setDoc, getDocs, collection, query, where, orderBy, startAt, endAt  } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../lib/firebase"

const AtivosContext = React.createContext()

export function useAtivos(){
    return useContext(AtivosContext)
}

export function AtivosProvider({ children}){
    
    function queryMed(q){
        const docRef = collection(firestore, 'ativos')
        const que = query(docRef, orderBy('nome'), startAt(q), endAt(q + '\uf8ff' ))
        return getDocs(que)
    }

    function getAll(){
        const docRef = collection(firestore, 'ativos')
        return getDocs(query(docRef))
    }

    const value = {
        queryMed,
        getAll
    }

    return (
        <AtivosContext.Provider value={value}>
            {children}
        </AtivosContext.Provider>
    )
}