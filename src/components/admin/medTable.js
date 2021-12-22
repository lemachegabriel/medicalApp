import React, {useState} from "react";
import { queryMed, delMed } from "../../lib/api/storeMed";
import { indexPro, delMedPro } from "../../lib/api/problems";
import styles from "./styles/medTable.module.css"
import EditMed from "./editMed";
import AddMed from "./storeMed"
import { Form, Button} from "react-bootstrap";

function MedTable() {  
  const [wordEntered, setWordEntered] = useState("");
  const [name, setName] = useState([]);
  const [edit, setEdit] = useState(false)
  const [add, setAdd] = useState(false)
  const [editData, setEditData] = useState({})
  const [dataPro, setDataPro] = useState([])
  let arrData = [{}]

  const getProData =async (e) => {
    const proData = await indexPro()
    setDataPro(proData)
    setAdd(true)
  }
  const deleteMedFromPro = async (id) => {
    const data = await indexPro()
    for(let i=0; i<data.length; i++){
      for(let j=0; j<data[i]['medicines'].length; j++){
        if(data[i]['medicines'][j]['_id'] == id){
          await delMedPro(id, data[i]['_id'])
        }
      }
    }
    
  }
  const deleteMed =  async (e) => { 
    const id = e.target.id
    const data = await delMed(id)
    if(data){
      dataTicker()
      deleteMedFromPro(id)
    }
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
  return (
    <div>
      {edit && <EditMed edit={edit} setedit={setEdit} data={editData}></EditMed>}
      {add && <AddMed setadd={setAdd} add={add} prodata={dataPro}></AddMed>}
      <div className="table">
        <table className={styles.table}>
          <thead>
            <tr className={styles.header}>
                <th className={styles.searchTh}>
                <Form className="d-flex" size="sm">
                  <Form.Control
                    type="search"
                    placeholder="Buscar"
                    value={wordEntered}
                    onChange={e => setWordEntered(e.target.value)}
                    size="sm"
                  />
                  <Button variant="outline-light" size="sm" onClick={dataTicker}>Search</Button>
                </Form>
                </th>
                <th className={styles.headerNormal}>Editar</th>
                <th className={styles.headerNormal}>Criado</th>
                <th className={styles.headerNormal}>deletar</th>
                <th className={styles.addButt}>
                  <Button variant="outline-light" size="sm" onClick={getProData}>Add</Button>
                </th>
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
                          <a className={styles.dataItem} id={value["_id"]} onClick={deleteMed}>deletar</a> 
                        </td>                               
                    </tr>
                  </tbody>
                );
                })}
        </table>
      </div>
    </div>
  );
}

export default MedTable;