import React, {useState} from "react";
import Link from 'next/link'
import { queryPro } from "../lib/api/problems";
import styles from "./styles/search.module.css"

function SearchBar({ placeholder}) {  
  const [wordEntered, setWordEntered] = useState("");
  const [TickerData, setTickerData] = useState([]);
  let arrData = []

  const dataTicker = async () => {
    setTickerData([])
    const filterWord = wordEntered.toLocaleLowerCase()
    const datas = await queryPro(filterWord)
    for(let i=0; i<datas.length; i++){
      arrData.push(datas[i]['name'])
    }
    setTickerData(arrData)
    console.log(TickerData)
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
      {TickerData.length != 0 ? (
        <div className={styles.dataResult}>
          {TickerData.slice(0, 5).map((value, key) => {
            return (
              <Link className={styles.dataItem} href={`/stocks/${value}`} target="_blank" key={value}>
                <p>{value}</p>  
              </Link>
            );
          })}
        </div>
      ):(
        <div>
          
        </div>
      )}
    </div>
  );
}

export default SearchBar;