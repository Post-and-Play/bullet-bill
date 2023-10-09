import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import '../components/ConfigButton.css';
import { IconContext } from 'react-icons';
import { MdArrowForward } from 'react-icons/md';
import api from '../services/Api';
import { getUser } from '../services/Auth';
import { Modals } from '../components/Modals';
import { useNavigate } from 'react-router-dom';
// import Fotoperfil from '../image/fotosperfil';
// import banner from '../image/fotosbanner';
import axios from 'axios';

const ConfigButton = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [tempUser, setTempUser] = useState({});
  const [name, setName] = useState('');
  const [user_name, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [description, setDescription] = useState('');
  const [configBox, setConfigBox] = useState(false);
  const [showNextForm, setShowNextForm] = useState(false);
  const [steamNick, setSteamNick] = useState('');
  const [epic_user, setEpicGamesNick] = useState('');
  const [twitch_user, setTwitchNick] = useState('');
  const [github_user, setGithubNick] = useState('');
  const [discordNick, setDiscordNick] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userIdOrNick, setUserIdOrNick] = useState(null); 
  const [base64Image, setBase64Image] = useState('');


  const navigate = useNavigate();
  const root = document.getElementById('root');
  const modals = new Modals();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      if (user) {
        const response = await api.get(`/api/users?id=${user.id}`);
        if (response.data.id) {
          setName(response.data.name);
          setUsername(response.data.user_name);
          setMail(response.data.mail);
          setBirth_date(response.data.birth_date);
          setDescription(response.data.description);
          setTwitchNick(response.data.twitch_user);
          setDiscordNick(response.data.discord_user);
          setEpicGamesNick(response.data.epic_user);
          setSteamNick(response.data.steam_user);
          setGithubNick(response.data.github_user);
          
        }
      }
    };

    fetchData(); // Chama a função fetchData quando o componente for montado
  }, []);

       // Crie um objeto com os dados atualizados do perfil
  const updateProfile = async () => {
    try {
      const user = await getUser();
      if (!user) {
        return;
      }

      // Crie um objeto com os dados atualizados do perfil
      const updatedUserData = {
        photo_adr:profileImage,
        top_adr:bannerImage,
        id: user.id,
        name,
        user_name,
        mail,
        birth_date,
        description,
        steam_user: steamNick,
        epic_user,
        twitch_user,
        github_user,
        discord_user: discordNick,
        // Outros campos que você deseja atualizar
      };

      // Se você deseja atualizar a senha, adicione-a ao objeto
      if (user.password) {
        updatedUserData.password = user.password;
      }

      const response = await api.patch(`/api/users?id=${user.id}`, updatedUserData);

      if (response.status === 200) {
        console.log(response);

        if (root) {
          modals.htmlDialog(
            root,
            'Perfil alterado com sucesso!',
            modals.msgboxButtons.okOnly,
            modals.msgboxIcons.check,
            'Mensagem!',
            {
              ok: (evt) => {
                window.location.reload();
              },
            }
          );
        }
      } else {
        console.error('Erro ao atualizar o perfil:', response);

        if (root) {
          modals.htmlDialog(
            root,
            'Erro ao atualizar o perfil!',
            modals.msgboxButtons.okOnly,
            modals.msgboxIcons.critical,
            'Mensagem!',
            {
              ok: (evt) => {
                // Lide com a falha na atualização do perfil aqui
              },
            }
          );
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);

      if (root) {
        modals.htmlDialog(
          root,
          'Erro ao atualizar o perfil!',
          modals.msgboxButtons.okOnly,
          modals.msgboxIcons.critical,
          'Mensagem!',
          {
            ok: (evt) => {
              // Lide com a falha na atualização do perfil aqui
            },
          }
        );
      }
    }
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();

    setSubmitted(true);

    await updateProfile();
  };


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

  const handleMailChange = (event) => {
    setMail(event.target.value);
  };

  const handleBirth_dateChange = (event) => {
    setBirth_date(event.target.value);
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

  const handleSteam_userChange = (event) => {
    setSteamNick(event.target.value);
  };

  const handleEpic_userChange = (event) => {
    setEpicGamesNick(event.target.value);
  };

  const handleTwitch_userChange = (event) => {
    setTwitchNick(event.target.value);
  };

  const handleGithub_userChange = (event) => {
    setGithubNick(event.target.value);
  };

  const handleDiscordNickChange = (event) => {
    setDiscordNick(event.target.value);
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0]; // Obtenha o arquivo selecionado
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // Quando a leitura estiver concluída, o resultado será armazenado em event.target.result
        const base64String = reader.result;
        setProfileImage(base64String); // Adicione a imagem de perfil ao array
      };
  
      reader.readAsDataURL(file); // Inicie a leitura do arquivo como base64
    }
  };
  
  const handleBannerChange = (e) => {
    const file = e.target.files[0]; // Obtenha o arquivo selecionado
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // Quando a leitura estiver concluída, o resultado será armazenado em event.target.result
        const base64String = reader.result;
        setBannerImage(base64String); // Adicione a imagem de fundo ao array
      };
  
      reader.readAsDataURL(file); // Inicie a leitura do arquivo como base64
    }
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
                      <label htmlFor="steam_user">Nickname da Steam:</label>
                      <input type="text" id="steam_user" value={steamNick} onChange={handleSteam_userChange} />
                    </div>
                    <div>
                      <label htmlFor="epicGamesNick">Nickname da Epic Games:</label>
                      <input type="text" id="epicGamesNick" value={epic_user} onChange={handleEpic_userChange} />
                    </div>
                    <div>
                      <label htmlFor="twitchNick">Nickname da Twitch:</label>
                      <input type="text" id="twitchNick" value={twitch_user} onChange={handleTwitch_userChange} />
                    </div>
                    <div>
                      <label htmlFor="githubNick">Nickname do GitHub:</label>
                      <input type="text" id="githubNick" value={github_user} onChange={handleGithub_userChange} />
                    </div>
                    <div>
                      <label htmlFor="discordNick">Nickname do Discord:</label>
                      <input type="text" id="discordNick" value={discordNick} onChange={handleDiscordNickChange} />
                    </div>
                  </div>
                  <div className="arrow">
                    <Icon icon="ph:arrow-left-bold" onClick={handleBackForm} />
                  </div>
                  <button className="configBox__button" onClick={handleSubmit1}>
                    Atualizar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>
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
                      <Icon icon="ph:pencil" size={24} />
                      <input
                        id="profileImageUpload"
                        type="file"
                        className="fileInput"
                        accept="image/*"
                        onChange={handleProfileChange}
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
                      <Icon icon="ph:pencil" size={24} />
                      <input
                        id="bannerImageUpload"
                        type="file"
                        className="fileInput"
                        accept="image/*"
                        onChange={handleBannerChange}
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
                    <label htmlFor="user">Nome de usuário:</label>
                    <input type="text" id="user" value={user_name} onChange={handleUsernameChange} />
                  </div>
                  <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" value={mail} onChange={handleMailChange} />
                  </div>
                  <div>
                    <label htmlFor="birthdate">Data de Nascimento:</label>
                    <input type="date" id="birthdate" value={birth_date} onChange={handleBirth_dateChange} />
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

                <button className="configBox__button" onClick={handleSubmit1}>
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
