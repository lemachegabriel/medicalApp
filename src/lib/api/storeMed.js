import { doc, setDoc, getDocs, collection, query, where, orderBy, startAt, endAt  } from "firebase/firestore";
import { firestore } from "../firebase";

export const addMed = async () => {
  await setDoc(doc(firestore, "ativos", "agadgs"), {
    descricao: "gjasdg a asdgj aj asgj asdg",
    dosagem: "fasfasf",
    nome: "agadgs"
  });
} 

export const getMed = async () => {
  const docRef = doc(firestore, 'ativos', 'VvRUC5QsDxzYHzD3fprs')
  const data = await getDoc(docRef)
  if (data.exists()) {
    console.log("Document data:", data.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  } 
}

export const queryMed = async () => {
  const docRef = collection(firestore, "ativos")
  const q = query(docRef, orderBy('nome'), startAt('as'), endAt('as' + '\uf8ff' ))
  const data = await getDocs(q)
  data.forEach(element => {
    console.log(element.id, " => ", element.data());
  });
}