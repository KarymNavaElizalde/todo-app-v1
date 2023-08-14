import { useState } from "react"


export const InputCreateTask = ({createTask})=> {

    const initialStateForm = {
        title: '',
        description: '',
        idColumn: 'to-do'
    }

    const [ createTaskState, setCreateTaskState ] = useState(initialStateForm)

    const handleChange = (e)=> {
        setCreateTaskState({...createTaskState, 
            [e.target.name]: e.target.value})
    }

    const enviar = (e)=> {
        if (createTaskState.title.length > 5 && createTaskState.description.length > 5) {
            createTask(createTaskState)
            setCreateTaskState(initialStateForm)
        }  
        e.preventDefault()
    }
        
    return (
        <form className="form">
            <div className="label-input">
                Title
            </div>
            <input value={createTaskState.title}  
                type="text"  
                name="title"
                className="input-form"
                onChange={handleChange}
            />
            <div className="label-input">
                Description
            </div>
            <input value={createTaskState.description}  
                type="text" 
                name="description"
                className="input-form"
                onChange={handleChange} 
            />
            <input 
                type="submit" 
                onClick={enviar} 
                className="submit-btn"
                value="Create"
            />
        </form>
    )
}

