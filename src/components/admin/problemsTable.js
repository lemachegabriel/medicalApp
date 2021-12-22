import React, {useState} from "react";
import { queryPro,  delPro} from "../../lib/api/problems";
import { indexMed } from "../../lib/api/storeMed";
import styles from "./styles/medTable.module.css"
import EditPro from "./editPro";
import AddPro from "./storeProblems";
import { Form, Button} from "react-bootstrap";

function ProTable() {  
  const [wordEntered, setWordEntered] = useState("");
  const [name, setName] = useState([]);
  const [edit, setEdit] = useState(false)
  const [add, setAdd] = useState(false)
  const [editData, setEditData] = useState({})
  const [dataMed, setDataMed] = useState([])
  const [selected, setSelected] = useState([])
  let arrData = [{}]
  let selData = []

  const callAdd = async () => {
    if(dataMed.length == 0){
      const medData = await indexMed()
      setDataMed(medData)
    }
    setAdd(true) 
  }
  const callEdit = async (value) => {
    setEditData(value)
    setEdit(true)
    if(dataMed.length == 0){
      const data = await indexMed()
      setDataMed(data)
    }
    for(let i=0; i<value['medicines'].length; i++){
      selData.push({value: value['medicines'][i]['_id'], label: value['medicines'][i]['name']})
    }
    setSelected(selData)
  }
  const deletePro =  async (e) => { 
    const id = e.target.id
    await delPro(id)
    await dataTicker
  }
  const dataTicker = async () => {
    setName([])
    const filterWord = wordEntered.toLocaleLowerCase()
    const datas = await queryPro(filterWord)
    for(let i=0; i<datas.length; i++){
      let correctDate = ""
      for(let j=0; j<10; j++){
        correctDate += datas[i]["createdAt"][j]
      }
      datas[i]["createdAt"] = correctDate
      arrData.push(datas[i])
    }
    setName(arrData)
  }
  return (
    <div>
      {edit && <EditPro edit={edit} setedit={setEdit} data={editData} meddata={dataMed} selectedP={selected}></EditPro>}
      {add && <AddPro setadd={setAdd} add={add} meddata={dataMed}></AddPro>}
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
                  <Button variant="outline-light" size="sm" onClick={dataTicker}>Buscar</Button>
                </Form>
                </th>
                <th className={styles.headerNormal}>Editar</th>
                <th className={styles.headerNormal}>Criado</th>
                <th className={styles.headerNormal}>deletar</th>
                <th className={styles.addButt}>
                  <Button id={'add'} variant="outline-light" size="sm" onClick={callAdd}>Add</Button>
                </th>
            </tr>
          </thead>
            {name.slice(1, 15).map((value, key) => {
                return (
                  <tbody>
                    <tr>
                        <td>{value["name"]}</td>
                        <td>
                        <a className={styles.dataItem} onClick={()=> {callEdit(value)}} key={value}>
                            editar
                        </a>
                        </td>
                        <td>{value["createdAt"]}</td>
                        <td>
                          <a className={styles.dataItem} id={value["_id"]} onClick={deletePro}>
                              deletar
                          </a> 
                        </td>     
                        <td>
                          <a className={styles.quantityTD}>
                            {value['medicines'].length}  
                          </a>  
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

export default ProTable;