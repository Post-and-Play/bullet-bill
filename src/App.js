import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Perfil from './Perfil';
import Editar from './components/ConfigButton'
import Login from './Login';
import Cadastro from './Cadastro';
import Recuperar from './RecuperarSenha';

function App() {
      return (
        <>
          <Routes>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/editar" element={<Editar />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<div>ERROR</div>} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/recuperar-senha" element={<Recuperar/>}/>
          </Routes>
        </>
      )
}
export default App;
