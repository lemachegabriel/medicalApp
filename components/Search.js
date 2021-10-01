import React, {useState} from "react";
import Link from 'next/link'
import { indexMed } from "../lib/api/storeMed";
import styles from "./styles/search.module.css"
import Select from "react-select";

function SearchBar({ placeholder}) {  
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [TickerData, setTickerData] = useState([]);
  let arrData = []

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const dataTicker = async () => {
    const datas = await indexMed()
    for(let i=0; i<datas.length; i++){
      arrData.push(datas[i]['name'])
    }
    setTickerData(arrData)
  }
  
  const handleFilter = (event) => {
    if(TickerData.length == 0){
      dataTicker()
    }
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = TickerData.filter((value) => {
      return value.toUpperCase().includes(searchWord.toUpperCase());
    });


    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  

  return (
    <div className={styles.search}>
      <Select options={options} isMulti/>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <button className="button green" onClick={clearInput}>X</button>
        <button className="button green" onClick={dataTicker}>getTickerName</button>
      </div>
      {filteredData.length != 0 && (
        <div className={styles.dataResult}>
          {filteredData.slice(0, 5).map((value, key) => {
            return (
              <Link className={styles.dataItem} href={`/stocks/${value}`} target="_blank" key={value}>
                <p>{value}</p>  
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;