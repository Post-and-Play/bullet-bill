import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';

import Perfil from './Perfil';
import Home from './Home';
import Login from './Login';
import Cadastro from './Cadastro'
import RecuperarSenha from './RecuperarSenha';
import RedefinirSenha from './RedefinirSenha';
import Jogo from './Jogo'
import Pesquisa from './Pesquisa'
<<<<<<< HEAD

=======
import Api from './services/Api';
>>>>>>> origin/games
function App() {
  return (
    <>
      <Routes>
<<<<<<< HEAD
        <Route path="/perfil" element={<Perfil />} />
=======
        <Route path="/perfil/" element={<Perfil />} />
>>>>>>> origin/games
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div>ERROR</div>} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/jogo" element={<Jogo />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
<<<<<<< HEAD
=======
        <Route path="/user" element={<Api/>} />
>>>>>>> origin/games
      </Routes>
    </>
  );
}
export default App;
