import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Navbar from './components/navbar/navbar';
import MainApp from './pages/App/mainapp';
import Home from './pages/Home/home';
import About from './pages/About/about';
<<<<<<< HEAD
import Voice from './pages/Voice/Voice';
=======
>>>>>>> 86b5554bdef2e86e5290a71c7f0c1159f9fa9372



function App() {
  

  return (
    <>
      <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/app" element={<MainApp></MainApp>}></Route>
          <Route path="/navbar" element={<Navbar></Navbar>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
<<<<<<< HEAD
          <Route path="/voice" element={<Voice></Voice>}></Route>
=======
>>>>>>> 86b5554bdef2e86e5290a71c7f0c1159f9fa9372
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
