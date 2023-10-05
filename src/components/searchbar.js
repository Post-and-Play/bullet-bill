import './searchbar.css'

import HitmanFoto from '../image/hitman.png';

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify-icons/ic/baseline-search";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            const results = searchInDatabase(searchTerm);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value === "") {
            setSearchResults([]);
        }
    };

    const searchInDatabase = (searchTerm) => {
        // Simulação: Retorna resultados fictícios com base no searchTerm
        return [
            {
                image: HitmanFoto,
                text: `${searchTerm}`,
            }
            // {
            //     image: "caminho_para_imagem2.jpg",
            //     text: `Resultado 2 para "${searchTerm}"`,
            // },
            // {
            //     image: "caminho_para_imagem3.jpg",
            //     text: `Resultado 3 para "${searchTerm}"`,
            // },
        ];
    };

    return (
        <div className="search-bar__container">
            <form className="search-bar" onSubmit={handleSubmit}>
                <div className="search-bar__button-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Digite o nome do jogo"
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
                                <img src={result.image} alt={`Foto jogo`} className='search-result-item__foto' />
                                <p className='search-result-item__nome'>{result.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
