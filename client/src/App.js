import React from 'react';
import Login from './components/login/Login';
import Register from './components/register/Register';
import{Route, BrowserRouter, Routes} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Register/>}/>
            <Route path="/login" exact element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
