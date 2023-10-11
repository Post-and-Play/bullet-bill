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
import Favoritos from './Favoritos';
import Indicar from './Indicar';
import Admin from './Admin';

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
        <Route path="/jogo" element={<Jogo />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/indicar-jogo" element={<Indicar />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/admin/jogos-indicados" element={<Admin />} /> */}

      </Routes>
    </>
  );
}
export default App;
