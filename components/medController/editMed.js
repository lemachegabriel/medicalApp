import React from "react";
import styles from "./styles/editMed.module.css"
import Select from "react-select";


function EditMed({ setedit, data }){
    
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    <button onClick={() => {setedit(false)}}> X </button>
                </div>
                <div className={styles.title}>
                    <h1>Editar ativo</h1>
                </div>
                <div className={styles.modalBody}>
                    <div>
                        <h1>Name:</h1>
                        <input defaultValue={data['name']}></input>
                    </div>
                    <div>
                        <h1>Descrição:</h1>
                        <textarea cols="50" rows="4" defaultValue={data['description']}></textarea>
                    </div>
                </div>
                
                <div className={styles.footer}>
                    <button onClick={() => {setedit(false)}}id="cancelBtn"> Cancelar </button>
                    <button>Save</button>
                </div>
            </div>
    </div>
  );
}

export default EditMed