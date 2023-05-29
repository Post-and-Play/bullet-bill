import '../components/searchbar.css'

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify-icons/ic/baseline-search";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para realizar a pesquisa com o searchTerm
        console.log("Realizando pesquisa:", searchTerm);
        setSearchTerm("");
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Digite o nome do jogo"
                className="search-bar__input"
            />
            <button type="submit" className="search-bar__submit-button">
                <Icon icon={searchIcon} className='iconify' />
            </button>
        </form>
    );
};

export default SearchBar;