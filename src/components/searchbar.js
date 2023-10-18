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

    const [gameResults, setGameResults] = useState([]);
    const [userResults, setUserResults] = useState([]);

    const handleProfileClick = (profile) => {
        // Redirecionar o usuário para o perfil do usuário clicado
        window.location.href = `/perfil/${profile}`; // Substitua com o formato de URL correto
    };

    const handleGameClick = (gameId, type) => {
        if (type === 'game')
            window.location.href = `/jogo?id=${gameId}`;
        else if (type === 'user')
            window.location.href = `/perfil?id=${gameId}`
    };

    const fetchSearchResults = async (term) => {

        if (term.trim() !== '') {

            try {
                const userSearchResponse = await api.get(`/api/users/search?name=${term}`);     
                if (userSearchResponse.status === 200) {
                   await setUserResults(Array.isArray(userSearchResponse.data)
                        ? userSearchResponse.data.map((user) => ({
                            ...user,
                            name: user.name,
                            photo_adr: user.photo_adr,
                            type: 'user'
                        }))
                        : []);
                } else {
                    await setUserResults([]);
                }
            } catch (error) {
                console.error('Erro ao buscar resultados de users:', error);
                await setUserResults([]);
            }

            try {
                const gameSearchResponse = await api.get(`/api/games/search?name=${term}`);
                if (gameSearchResponse.status === 200) {
                    await setGameResults(Array.isArray(gameSearchResponse.data)
                        ? gameSearchResponse.data.map((game) => ({
                            ...game,
                            name: game.name,
                            top_adr: game.top_adr,
                            type: 'game'
                        }))
                        : []);
                } else {
                    await setGameResults([]);
                    
                }
            } catch (error) {
                console.error('Erro ao buscar resultados de games:', error);
                await setGameResults([]);
            }
        } else if(searchTerm === '') {
            handleSearchNull();

        } else{
            await setSearchResults([]);
            
        }

        const combinedResults = [...userResults, ...gameResults];
        await setSearchResults(combinedResults);

        console.log(combinedResults);

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

    const handleSearchNull = (e) =>{
        
        navigate ('/pesquisa')
    }

 
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
                <button type="submit" className="search-bar__submit-button" >
                <Icon icon={searchIcon} className="iconify" />
                </button>
            </div>
            {searchResults.length > 0 && (
                <div className="search-results">
                {searchResults.map((result, index) => (
                    <div key={index} className="search-result-item" onClick={() => handleGameClick(result.id, result.type)}>
                    <img src={result.photo_adr || result.top_adr}  alt={`Foto jogo`} className='search-result-item__foto' />
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
