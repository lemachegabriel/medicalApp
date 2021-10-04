import React, {useState} from "react";
import Link from 'next/link'
import { queryMed, delMed } from "../../lib/api/storeMed";
import styles from "../styles/search.module.css"

function MedTable({ placeholder}) {  
  const [wordEntered, setWordEntered] = useState("");
  const [name, setName] = useState([]);
  let nameData = [{
      name: "",
      _id: ""
  }]
  
  const deleteMed =  async (e) => { 
    const id = e.target.id
    await delMed(id)
  }
  const dataTicker = async () => {
    setName([])
    const filterWord = wordEntered.toLocaleLowerCase()
    const datas = await queryMed(filterWord)
    for(let i=0; i<datas.length; i++){
      nameData.push({name: datas[i]['name'], id: datas[i]["_id"]})
    }
    setName(nameData)
    console.log(name)
  }

  const clearInput = () => {
    setWordEntered("");
  };

  return (
    <div className={styles.search}>
      
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
        <div className={styles.dataResult}>
            <table>
                <tr id="header">
                    <th>Ativo</th>
                    <th>Editar</th>
                    <th>deletar</th>
                </tr>
                {name.slice(1, 5).map((value, key) => {
                    return (
                        <tr>
                            <th>{value["name"]}</th>
                            <th>
                            <Link className={styles.dataItem} href={`/admin/edit/${value["id"]}`} target="_blank" key={value}>
                                editar
                            </Link>
                            </th>
                            <th>
                            <a className={styles.dataItem} id={value["id"]} onClick={deleteMed}>
                                deletar
                            </a> 
                            </th>                               
                        </tr>
                    );
                    })}
            </table>
        </div>
      ):(
        <div>
          
        </div>
      )}
    </div>
  );
}

export default MedTable;