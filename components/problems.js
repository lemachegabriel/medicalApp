import React, {useState} from "react";
import AddMed from "./medController/storeMed";
import MedTable from "../components/medController/medTable"


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
      <button id></button>
      <button onClick={clear}></button>
      {options == "addMed" ? (
        <AddMed></AddMed>
      ) : (
        <MedTable></MedTable>
      )}
    </div>
  )
}
export default Problems