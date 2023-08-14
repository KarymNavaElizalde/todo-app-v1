import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { baseUrl } from "../api/baseUrl"
import { v4 as uuidv4 } from 'uuid'


export const LoginPage = ()=> {
    
    const navigate = useNavigate()

    const initialStateLoginForm = {
        userName:'',
        contrasena:''
    }

    const [ loginForm, setLoginForm ] = useState(initialStateLoginForm)

    const login = (e)=> {
      e.preventDefault()
      checkUser(loginForm.userName, loginForm.contrasena)
    }

    const checkUser = (usr,pass)=> {
        baseUrl.get(`users?nombreUsuario=${usr}&contrasena=${pass}`)
        .then((res)=> res.data.length>0 && setToken() || navigate("/project") )
    }                
  
    const handleChange = (e)=> {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    const setToken = ()=> {
        localStorage.setItem( "sesionToken", uuidv4() )
    }


    return (
      <div className="login-main-container">
        <div className="login-forms-container">
        <form className="login-form" onSubmit={login}>
              <div className="login-label-input">
                  Nombre de usuario
              </div>
              <input   
                  type="text"  
                  value={loginForm.userName}
                  name="userName"
                  className="login-input-form"
                  onChange={handleChange}
              />
              <div className="login-label-input">
                  Contraseña
              </div>
              <input  
                  type="password" 
                  value={loginForm.contrasena}
                  name="contrasena"
                  className="login-input-form"
                  onChange={handleChange}
              />
              <input 
                  type="submit" 
                  className="login-submit-btn"
                  value="Entrar"
              />
          </form>
          <p className="login-question-create-account"> 
            ¿Aún no tienes una cuenta? &nbsp;
            <Link to={"/signup"} className="registrate">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    );
  }
  