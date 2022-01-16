import { doc, setDoc, getDocs, collection, query, where, orderBy, startAt, endAt  } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../lib/firebase"

const DoencasContext = React.createContext()

export function useDoencas(){
    return useContext(DoencasContext)
}

export function DoencasProvider({ children}){
    
    function queryDoc(q){
        const docRef = collection(firestore, 'doencas')
        const que = query(docRef, orderBy('nome'), startAt(q), endAt(q + '\uf8ff' ))
        return getDocs(que)
    }

    function getAll(){
        const docRef = collection(firestore, 'doencas')
        return getDocs(query(docRef))
    }

    const value = {
        queryDoc,
        getAll,
    }

    return (
        <DoencasContext.Provider value={value}>
            {children}
        </DoencasContext.Provider>
    )
}