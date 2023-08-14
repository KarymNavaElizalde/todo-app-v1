import { useEffect, useState } from "react"

export const ColumnList = ({id, title, description, idColumn, deleteTask, changeColumnTask})=> {

//title, description, idColumn
    const [ radioButtonState, setRadioButtonState ] = useState(null)

    const idColumnList = [ "to-do", "in-progress", "finished"]

    const handleChangeRadioB = (columName)=> {
        setRadioButtonState(columName)
    }
    
    useEffect(()=>{
        radioButtonState && changeColumnTask(id, title, description, radioButtonState)
    },[radioButtonState])

    return (
        <div className="card-container">
                <div className="card-title-container">
                    <h4 className="card-title">{title}</h4>
                </div>
                <div className="card-description-container">
                    <p className="card-description">
                        {description}
                    </p>
                </div>
            <div className="card-footer-container">
                <div className="card-footer-radio-button-container">
                    <div className="radioB-container">
                        {   
                            idColumnList.map((column)=> (
                            column !== idColumn &&
                                <div key={column} className="radio-and-label-container">
                                    <input  type="radio" 
                                            id={column} 
                                            name={column} 
                                            value={column} 
                                            onChange={()=> handleChangeRadioB(column)}
                                            className="radio-button"
                                    />
                                     &nbsp;
                                    <div className="label-radioB">
                                        {column}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="card-footer-delete-icon-container" onClick={()=> deleteTask(id)}>
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </div>
            </div>
        </div>
    )
}

