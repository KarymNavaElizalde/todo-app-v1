
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import MainLayout from './layouts/MainLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useEffect } from 'react'

const App = ()=> {

    useEffect(()=>{
        getToken()
    },[])

    /*
    const checkToken = ()=> {
        localStorage.setItem("mensaje", "hola")
    } */

    const getToken = ()=> {
        const token = localStorage.getItem("sesionToken")
        return token
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={ <LoginPage /> } />
                <Route path='/signup' element={ <SignupPage /> } />
                
                <Route element={<ProtectedRoute  getToken={getToken} />} >
                    <Route path='/project' element={ <MainLayout /> } />
                </Route> 

            </Routes>
        </BrowserRouter>
    )
}

export default App