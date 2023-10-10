import './searchbar.css'

import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import searchIcon from "@iconify-icons/ic/baseline-search";

import api from '../services/Api';
import { getUser } from '../services/Auth';
import { Modals } from './Modals';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [profile, setProfile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [name ,setName]= useState ('');

    const getCurrentUser = async() => {

        let user = await getUser();
        if (user) {
                const response = await api.get('./api/users?id=' + user.id);
                if (response.data.id){
                    
                    setName(response.data.name);
                    setProfileImage(response.data.photo_adr);
                    
                }
        }
    }

    getCurrentUser()

    const handleProfileClick = (profile) => {
      // Redirecionar o usuário para o perfil do usuário clicado
      window.location.href = `/perfil/${profile}`; // Substitua com o formato de URL correto
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (searchTerm.trim() !== '') {
        try {
          const response = await api.get(`/api/users?name=${searchTerm}`);
          if (response.status === 200) {
            setSearchResults([{
              id: response.data.id,
              name: response.data.name,
              nickname: response.data.user_name,
              // Outros campos que você deseja exibir no resultado da pesquisa
            }]);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };
  
    const handleChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      if (value === '') {
        setSearchResults([]);
      }
    };
  
    return (
      <div className="search-bar__container">
        <form className="search-bar" onSubmit={handleSubmit}>
          <div className="search-bar__button-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Digite o nome do usuário"
              className="search-bar__input"
            />
            <button type="submit" className="search-bar__submit-button">
              <Icon icon={searchIcon} className="iconify" />
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div key={index} className="search-result-item">
                      <img src={result.photo_adr} alt={`Foto jogo`} className='search-result-item__foto' />
                  <p className='search-result-item__nome'>{result.name}</p>
                  <p className='search-result-item__nickname'>{result.nickname}</p>
                  <a
                    href={`/perfil/${result.id}`} // Substitua com o formato de URL correto
                    onClick={(e) => {
                      e.preventDefault();
                      handleProfileClick(result.id);
                    }}
                  >
                  </a>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  };
  
  export default SearchBar;
