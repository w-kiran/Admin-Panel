import { useState } from 'react'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          <Route path='/home' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          <Route path='/admin' element={<ProtectedRoutes><AdminPanel/></ProtectedRoutes>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
