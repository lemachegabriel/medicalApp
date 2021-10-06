import React, {useState} from "react";
import Link from 'next/link'
import { queryMed, delMed } from "../../lib/api/storeMed";
import styles from "./styles/medTable.module.css"
import EditMed from "./editMed";

function MedTable({ placeholder}) {  
  const [wordEntered, setWordEntered] = useState("");
  const [name, setName] = useState([]);
  const [edit, setEdit] = useState(false)
  const [editData, setEditData] = useState({})
  let arrData = [{}]

  const deleteMed =  async (e) => { 
    const id = e.target.id
    await delMed(id)
  }
  const dataTicker = async () => {
    setName([])
    const filterWord = wordEntered.toLocaleLowerCase()
    const datas = await queryMed(filterWord)
    for(let i=0; i<datas.length; i++){
      let correctDate = ""
      for(let j=0; j<10; j++){
        correctDate += datas[i]["date"][j]
      }
      datas[i]["date"] = correctDate
      arrData.push(datas[i])
    }
    setName(arrData)
  }
  const clearInput = () => {
    setWordEntered("");
  };

  return (
    <div>
      {edit && <EditMed setedit={setEdit} data={editData}></EditMed>}
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={e => setWordEntered(e.target.value)}
        />
        <button className="button green" onClick={clearInput}>X</button>
        <button className="button green" onClick={dataTicker}>buscar</button>
      </div>
      {name.length != 0 ? (
        <div className="table">
          
            <table className={styles.table}>
              <thead>
                <tr className={styles.header}>
                    <th>Ativo</th>
                    <th>Editar</th>
                    <th>Criado</th>
                    <th>deletar</th>
                </tr>
              </thead>
                {name.slice(1, 15).map((value, key) => {
                    return (
                      <tbody>
                        <tr>
                            <td>{value["name"]}</td>
                            <td>
                            <a className={styles.dataItem} onClick={() => {setEdit(true), setEditData(value)}} key={value}>
                                editar
                            </a>
                            </td>
                            <td>{value["date"]}</td>
                            <td>
                            <a className={styles.dataItem} id={value["_id"]} onClick={deleteMed}>
                                deletar
                            </a> 
                            </td>                               
                        </tr>
                      </tbody>
                    );
                    })}
            </table>
            
        </div>
      ):(
        <div></div>
      )}
    </div>
  );
}

export default MedTable;