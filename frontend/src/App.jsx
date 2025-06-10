import { useState } from 'react'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import AdminPanel from './pages/AdminPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/admin' element={<AdminPanel/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
