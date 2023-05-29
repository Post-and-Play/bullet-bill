import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import '../components/ConfigButton.css'
import { IconContext } from 'react-icons';
import { MdPhoto, MdArrowForward } from 'react-icons/md';
import { pencil } from 'react-icons-kit/fa/pencil';

const ConfigButton = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [description, setDescription] = useState('');
    const [configBox, setConfigBox] = useState(false);
    const [showNextForm, setShowNextForm] = useState(false);
    const [showBackForm, setShowBackForm] = useState(false);
    const [steamNick, setSteamNick] = useState('');
    const [epicGamesNick, setEpicGamesNick] = useState('');
    const [twitchNick, setTwitchNick] = useState('');
    const [githubNick, setGithubNick] = useState('');
    const [discordNick, setDiscordNick] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
  
    const handleIconClick = () => {
      setConfigBox(true);
    };
  
    const handleClose = () => {
      setConfigBox(false);
    };
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleBirthdateChange = (event) => {
      setBirthdate(event.target.value);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleNextForm = () => {
      setShowNextForm(true);
    };
  
    const handleBackForm = () => {
        
        setShowNextForm(false);
    };
  
    const handleProfileImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleBannerImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSteamNickChange = (event) => {
      setSteamNick(event.target.value);
    };
  
    const handleEpicGamesNickChange = (event) => {
      setEpicGamesNick(event.target.value);
    };
  
    const handleTwitchNickChange = (event) => {
      setTwitchNick(event.target.value);
    };
  
    const handleGithubNickChange = (event) => {
      setGithubNick(event.target.value);
    };
  
    const handleDiscordNickChange = (event) => {
      setDiscordNick(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Aqui você pode usar as constantes (name, username, email, birthdate, description) como desejar.
      // Por exemplo, enviá-las para o servidor usando uma chamada de API.
  
      // Limpar o estado do formulário após o envio, se necessário
      setName('');
      setUsername('');
      setEmail('');
      setBirthdate('');
      setDescription('');
      setProfileImage(null);
      setBannerImage(null);
      setConfigBox(false);
      setSubmitted(true);
    };
  

    const handleSubmitForm2 = (event) => {
        event.preventDefault();
      
        // Lógica para lidar com o envio do segundo formulário
      
        // Limpar o estado do formulário após o envio, se necessário
        setSteamNick('');
        setEpicGamesNick('');
        setTwitchNick('');
        setGithubNick('');
        setDiscordNick('');
        setConfigBox(false);
      };
  
    return (
      <div>
        {showNextForm ? (
          // Segundo formulário
          <div>
            <div>
              <div className="container">
                <div className="btn__config" onClick={handleIconClick}>
                  <Icon icon="ph:gear" className="perfil-banner__gearIcon" />
                  <span className="txt__config"></span>
                </div>
              </div>
            {configBox && (
              <div className="configBox__container">
                <div className="configBox">
                  <div className="closeConfigBtn__row">
                    <Icon icon="ph:x" className="closeConfiBtn" onClick={handleClose} />
                  </div>
                  <div className="configBox__form">
                    <div>
                      <label htmlFor="steamNick">Nickname da Steam:</label>
                      <input type="text" id="steamNick" value={steamNick} onChange={handleSteamNickChange} />
                    </div>
                    <div>
                      <label htmlFor="epicGamesNick">Nickname da Epic Games:</label>
                      <input type="text" id="epicGamesNick" value={epicGamesNick} onChange={handleEpicGamesNickChange} />
                    </div>
                    <div>
                      <label htmlFor="twitchNick">Nickname da Twitch:</label>
                      <input type="text" id="twitchNick" value={twitchNick} onChange={handleTwitchNickChange} />
                    </div>
                    <div>
                      <label htmlFor="githubNick">Nickname do GitHub:</label>
                      <input type="text" id="githubNick" value={githubNick} onChange={handleGithubNickChange} />
                    </div>
                    <div>
                      <label htmlFor="discordNick">Nickname do Discord:</label>
                      <input type="text" id="discordNick" value={discordNick} onChange={handleDiscordNickChange} />
                    </div>
                  </div>
                  <div className="arrow">
                    <Icon icon="ph:arrow-left-bold" onClick={handleBackForm} />
                  </div>
                  <button className="configBox__button" onClick={handleSubmitForm2}>
                    Atualizar Perfil
                    </button>
                </div>
              </div>
            )}</div>
          </div>
        ) : (
          // Primeiro formulário
          <div>
            <div className="container">
              <div className="btn__config" onClick={handleIconClick}>
                <Icon icon="ph:gear" className="perfil-banner__gearIcon" />
                <span className="txt__config"></span>
              </div>
            </div>
  
            {configBox && (
            <div className="configBox__container">
              <div className="configBox">
                <div className="closeConfigBtn__row">
                <Icon icon="ph:x" className="closeConfiBtn" onClick={handleClose} />
                </div>

                <div className="configBox__form">
                <div className="profileImageContainer">
                <div className="imageLabel">Imagem de perfil</div>
                    <div className="profileImageWrapper">
                      {profileImage ? (
                        <img className="profileImage" src={profileImage} alt="Imagem de perfil" />
                      ) : (
                        <label htmlFor="profileImageUpload" className="upload-icon-placeholder">
                          <Icon icon={pencil} size={24} />
                          <input
                            id="profileImageUpload"
                            type="file"
                            className="fileInput"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="bannerImageContainer">
                  <div className="imageLabel">Imagem de fundo</div>
                    <div className="bannerImageWrapper">
                      {bannerImage ? (
                        <img className="bannerImage" src={bannerImage} alt="Imagem de fundo" />
                      ) : (
                        <label htmlFor="bannerImageUpload" className="upload-icon-placeholder">
                          <Icon icon={pencil} size={24} />
                          <input
                            id="bannerImageUpload"
                            type="file"
                            className="fileInput"
                            accept="image/*"
                            onChange={handleBannerImageChange}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} />
                  </div>
                  <div>
                    <label htmlFor="username">Nome de usuário:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                  </div>
                  <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                  </div>
                  <div>
                    <label htmlFor="birthdate">Data de Nascimento:</label>
                    <input type="date" id="birthdate" value={birthdate} onChange={handleBirthdateChange} />
                  </div>
                  <div>
                    <label htmlFor="description">Descrição:</label>
                    <textarea id="description" value={description} onChange={handleDescriptionChange} />
                  </div>
                </div>

                <div className="arrow">
                  <IconContext.Provider value={{ size: '2rem' }}>
                    <MdArrowForward className="arrow-icon" onClick={handleNextForm} />
                  </IconContext.Provider>
                </div>

                <button className="configBox__button" onClick={handleSubmit}>
                  Atualizar Perfil
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfigButton;