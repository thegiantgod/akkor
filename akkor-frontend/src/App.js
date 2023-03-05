import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Homescreen from './components/Screen/Homescreen';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Hotel from './components/Hotel';
import Reservation from './components/Reservation';

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/register' exact element={<Register/>} />
          <Route path='/home' exact element={<Homescreen/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/hotels' exact element={<Hotel/>} />
          <Route path='/booking' exact element={<Reservation/>} />
        </Routes> 
      
      
      </BrowserRouter>



    </div>
    
    
    
  );
}

export default App;