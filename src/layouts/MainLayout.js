import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {ColumnList, InputCreateTask} from "../components" 
import { baseUrl } from "../api/baseUrl"
import '../index.css'

const MainLayout = ()=> {

    const navigate = useNavigate()

    const [ taskListState, setTaskListState ] = useState([])
    const [ createdAlert, setCreatedAlert ] = useState(false)

    const alertSuccesful = ()=> {
        setCreatedAlert(true)
        setTimeout(()=>{
            setCreatedAlert(false)
        },2500)
      }

    const getTaskList = ()=> {
        baseUrl.get('taskListArray').then(res => setTaskListState(res.data))
    }

    const createTask = (newTask)=> {
        baseUrl.post('taskListArray', newTask)
        .then(()=> alertSuccesful() || getTaskList())
    }

    const changeColumnTask = (id, title, description, idColumn)=> {
        baseUrl.put(`taskListArray/${id}`, {
            id: id,
            title: title,
            description: description,
            idColumn: idColumn
        }).then(()=> getTaskList())
    }

    const deleteTask = (index)=> {
        baseUrl.delete(`taskListArray/${index}`)
        .then( ()=> getTaskList() )
    }

    const logoutUser = ()=> {
        localStorage.removeItem("sesionToken")
        navigate("/login")
    }

    useEffect(()=>{
        getTaskList()
    },[])

    return (
        <div className="main-container">
            <div className="layout-container">
                <div className="create-task-container column-container">
                    <div className="forms-container">
                        <div className="create-task-header-container">
                            <h3>CREATE TASK</h3>
                        </div>
                        <div className="create-task-form-container">  
                            {   !createdAlert ?
                                <InputCreateTask createTask={createTask}/> 
                                :
                                <div className="alert-succesful">
                                    Tarea creada con éxito
                                    <span class="material-symbols-outlined succes-symbol">
                                        task_alt
                                    </span>
                                </div>
                            }
                        </div>
                        <div className="logout-button-container">
                            <button  
                                onClick={logoutUser}
                                className="logout-button"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
                <div className="to-do-column-container column-container">
                    <div className="to-do-header-container">
                        <h2>TO-DO</h2>
                    </div>
                    <div className="to-do-list-container">
                        {
                            taskListState.length > 0 && 
                            (
                                taskListState.map((task)=> (
                                    task.idColumn === "to-do" &&
                                    <ColumnList id={task.id} 
                                        title={task.title} 
                                        description={task.description}
                                        idColumn={task.idColumn}
                                        createTask={createTask}
                                        deleteTask={deleteTask}
                                        changeColumnTask={changeColumnTask}
                                        key={task.id}
                                    />
                                ))
                            )
                        }
                        
                    </div>
                </div>
                <div className="in-progress-column-container column-container">
                    <div className="in-progress-header-container">
                        <h2>IN-PROGRESS</h2>
                    </div>
                    <div className="in-progress-list-container">
                        {
                            taskListState.length > 0 && 
                            (
                                taskListState.map((task)=> (
                                    task.idColumn === "in-progress" &&
                                    <ColumnList id={task.id} 
                                        title={task.title} 
                                        description={task.description}
                                        idColumn={task.idColumn}
                                        createTask={createTask}
                                        deleteTask={deleteTask}
                                        changeColumnTask={changeColumnTask}
                                        key={task.id}
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
                <div className="finished-column-container column-container">
                    <div className="finished-header-container">
                        <h2>FINISHED</h2>
                    </div>
                    <div className="finished-list-container">
                        {
                            taskListState.length > 0 &&
                            (
                                taskListState.map((task)=> (
                                    task.idColumn === "finished" &&
                                    <ColumnList id={task.id} 
                                        title={task.title} 
                                        description={task.description}
                                        idColumn={task.idColumn}
                                        createTask={createTask}
                                        deleteTask={deleteTask}
                                        changeColumnTask={changeColumnTask}
                                        key={task.id}
                                    />
                                ))
                            ) 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout