import { lazy,Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const Main = lazy(()=> import('./pages/main/main'))
const Login = lazy(()=> import('./pages/login'))
const CreatePost = lazy(()=> import('./pages/create-post/create-post'))

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/createpost" element={<CreatePost />}/>
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App