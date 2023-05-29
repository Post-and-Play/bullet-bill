import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';

import Perfil from './Perfil';
import Home from './Home';
import Login from './Login';
import Cadastro from './Cadastro'
import RecuperarSenha from './RecuperarSenha';
import RedefinirSenha from './RedefinirSenha';

function App() {
  return (
    <>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div>ERROR</div>} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
      </Routes>
    </>
  );
}
export default App;
