import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';



function App() {
  

  return (
    <>
      <div className="App">
      <Router>
        <Routes>
          <Route index element={<Login></Login>}></Route>
          <Route path="./login" element={<Login></Login>}></Route>
          
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
