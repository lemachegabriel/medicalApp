import { createPro, delPro, addMed, indexPro } from "../lib/api/problems";
import React, {useState} from "react";
import AddMed from "./medController/storeMed";

function Problems(){
  const [options, setOptions] = useState("")

  const handleClick = (e) => {
      e.preventDefault()
      setOptions(e.target.className)
      console.log(options)
  }
  const clear = () => {
    setOptions("")
  }
  return (
    <div>
      <button className="addMed" onClick={handleClick}> Adicionar novo ativo</button>
      <button onClick={clear}></button>
      {options == "addMed" ? (
        <AddMed></AddMed>
      ) : (
        <div> adada </div>
      )}
    </div>
  )
}
export default Problems