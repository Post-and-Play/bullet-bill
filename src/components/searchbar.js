import './searchbar.css'

import HitmanFoto from '../image/hitman.png';

import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import searchIcon from "@iconify-icons/ic/baseline-search";

import api from '../services/Api';
import { getUser } from '../services/Auth';
import { Modals } from './Modals';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ currentUser }) => {

  let searchTimeout;

  const root = document.getElementById('root');
  const modals = new Modals();
  const loading = new modals.htmlLoading(root);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleProfileClick = (profile) => {
    // Redirecionar o usuário para o perfil do usuário clicado
    window.location.href = `/perfil/${profile}`; // Substitua com o formato de URL correto
  };

  const handleGameClick = (gameId) => {
    window.location.href = `/jogo?id=${gameId}`
  };

  const fetchSearchResults = async (term) => {
    try {
      if (term.trim() !== '') {
        const userSearchResponse = await api.get(`/api/users?name=${term}`);
        const gameSearchResponse = await api.get(`/api/games/search?name=${term}`);

        if (userSearchResponse.status === 200 || gameSearchResponse.status === 200) {
          const userResults = Array.isArray(userSearchResponse.data)
            ? userSearchResponse.data.map((user) => ({
              ...user,
              name: user.name,
              photo_adr: user.photo_adr,
            }))
            : [];

          const gameResults = Array.isArray(gameSearchResponse.data)
            ? gameSearchResponse.data.map((game) => ({
              ...game,
              name: game.name,
              top_adr: game.top_adr,
            }))
            : [];

          const combinedResults = [...userResults, ...gameResults];
          setSearchResults(combinedResults);
        } else {
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        navigate('/pesquisa');
      }
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
      setSearchResults([]);
    }
  };

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      fetchSearchResults(value);
    }, 500); // Atraso de 500 milissegundos (ajuste conforme necessário)
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Executar a pesquisa aqui
    fetchSearchResults(searchTerm);
  };

  // useEffect(() => {
  //   if (searchTerm.trim() !== '') {
  //     fetchSearchResults(searchTerm);
  //   } else {
  //     setSearchResults([]);
  //   }
  // }, [searchTerm]);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);
  // };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setProfileImage(currentUser.photo_adr);
    }
  }, [currentUser]);



  return (
    <div className="search-bar__container">
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <div className="search-bar__button-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Digite o nome de um jogo"
            className="search-bar__input"
          />
          <button type="submit" className="search-bar__submit-button">
            <Icon icon={searchIcon} className="iconify" />
          </button>
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <div key={index} className="search-result-item" onClick={() => handleGameClick(result.id)}>
                <img src={result.top_adr} alt={`Foto jogo`} className='search-result-item__foto' />
                <p className='search-result-item__nome'>{result.name}</p>
                {/* <p className='search-result-item__nickname'>{result.nickname}</p> */}
                {/* <a
                  href={`/jogo?id=${result.id}`} // Substitua com o formato de URL correto
                  onClick={(e) => {
                    e.preventDefault();
                    handleProfileClick(result.id);
                  }}
                > */}
                {/* </a> */}
              </div>
            ))}
          </div>
        )
        }
      </form >
    </div >
  );
};

export default SearchBar;
