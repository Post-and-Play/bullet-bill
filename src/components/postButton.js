import '../components/postButton.css'

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import sharpSendIcon from '@iconify-icons/ic/sharp-send';
import attachmentIcon from '@iconify-icons/ic/attachment';
import CloseIcon from '../icons/close.svg';
import { toast } from 'react-toastify';

import api from '../services/Api';
import { getUser } from "../services/Auth";
import { Modals } from './Modals';

const PostButton = ({ currentUser }) => {

    const root = document.getElementById('root');
    const modals = new Modals();
    const loading = new modals.htmlLoading(root);

    const [games, setGames] = useState([]);
    const [postBox, setPostBox] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [opiniao, setOpiniao] = useState('');
    const [selectedNota, setSelectedNota] = useState();
    const [selectedColor, setSelectedColor] = useState('');
    const [file, setFile] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [userId, setUserId] = useState(null);
      
    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser.id);
        }
    }, [currentUser]);


    const handleClick = () => {
        setPostBox(!postBox);
    }

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleClose = () => {
        setPostBox(false);
    }

    const valoresNotas = Array.from({ length: 21 }, (_, index) => index * 0.5);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            toast.success('Imagem adicionada!', { position: toast.POSITION.TOP_RIGHT });
        }
    };

    //Função que muda as cores dos controles na sequencia do clique
    const handleNotaClick = (event) => {
        const note = parseFloat(event.target.getAttribute('data-note'))
        console.log(note)
            //alert(note);
            const notes = document.getElementsByClassName('postBox__nota');
            if (notes.length >=0) {

                for (let i = 0; i < notes.length; i++) {
                    notes[i].classList.remove('checked');
                }

                for (let i = 0; i < notes.length; i++) {
                    let temp = parseFloat(notes[i].getAttribute('data-note'))
                    if (temp <= note) {
                        notes[i].classList.add('checked');
                    }
                

                setSelectedNota(note);

            }
        }
    }

    const handlePost = async () => {

        try {
            // const reviewId = event.target.id;

            // Verifique novamente se todos os campos obrigatórios estão preenchidos
            if (!isFormValid) {
                //toast.error('Por favor, preencha todos os campos obrigatórios.', { position: toast.POSITION.TOP_RIGHT });
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Por favor, preencha todos os campos obrigatórios.',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.check,
                        'Mensagem!',
                        {
                            ok: (evt) => {

                            }
                        });
                }
                return;
            }

            // Converter o selectedOption (game_id) para um número inteiro
            const gameId = parseInt(selectedOption, 10);

            // Certifique-se de que gameId é um número válido
            if (isNaN(gameId)) {
                //toast.error('Por favor, selecione um jogo válido.', { position: toast.POSITION.TOP_RIGHT });
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Por favor, selecione um jogo válido.',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.check,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                               
                            }
                        });
                }
                return;
            }

            // Crie um objeto com as informações a serem postadas
            const postData = {
                user_id: userId,
                game_id: gameId,
                grade: selectedNota,
                image_adr: file ? await convertImageToBase64(file) : null,
                opinion: opiniao,
            };

            loading.show();
            // Enviar os dados para a API
            const response = await api.post(`/api/review`, postData);

            if (response.data.id) {
                // Postagem bem-sucedida
                //toast.success('Postagem realizada com sucesso!', { position: toast.POSITION.TOP_RIGHT });
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Postagem realizada com sucesso!',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.check,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                                resetForm();
                                window.location.reload();
                            }
                        });
                }

                // Limpar o formulário ou fazer outras ações necessárias após a postagem
                
            } else {
                // Lidar com erros de postagem
                //toast.error('Ocorreu um erro ao postar. Tente novamente mais tarde.', { position: toast.POSITION.TOP_RIGHT });
                if (root) {
                    modals.htmlDialog(
                        root,
                        'Ocorreu um erro ao postar. Tente novamente mais tarde.',
                        modals.msgboxButtons.okOnly,
                        modals.msgboxIcons.warning,
                        'Mensagem!',
                        {
                            ok: (evt) => {
                               
                            }
                        });
                }
            }
            loading.close();

        }
        catch (error) {
            // Lidar com erros de exceção
            console.error('Erro ao postar:', error);
        }
    };

    const resetForm = () => {
        // Limpar os campos do formulário após a postagem
        setSelectedOption('');
        setSelectedNota(null);
        setOpiniao('');
        setFile(null);
        setIsFormValid(false);
    };

    // Função para converter uma imagem em base64
    const convertImageToBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(imageFile);
        });
    };

    useEffect(() => {
        // Verifique se todos os campos obrigatórios estão preenchidos
        const formIsValid = selectedOption !== '' && selectedNota !== null && opiniao.trim() !== '';
        setIsFormValid(formIsValid);
    }, [selectedOption, selectedNota, opiniao]);


    const getGames = async () => {

        try {
            const response = await api.get('./api/games/search');
            if (response.data) {
                setGames(response.data);
            }
            else {
                setGames([]);
            }
        } catch (err) {
            setGames([]);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            await getGames();
        };
        fetchData(); // Chama a função fetchData quando o componente for montado
    }, []);

    return (
        <div>
            <div className="container">
                <div className="btn__post" onClick={handleClick}>
                    {/* <Icon icon={sharpSendIcon} className='iconPost' width={24} height={24} color="#000" /> */}
                    <Icon icon={sharpSendIcon} className='icon__post' />
                    <span className='txt__post'>post</span>
                </div>
            </div>

            {postBox &&
                <div className='postBox__container'>
                    <div className="postBox">
                        <div className="closeBtn__row">
                            <img className='closeBtn' src={CloseIcon} alt="Close Icon" onClick={handleClose} />
                        </div>
                        <select className='postBox__selectJogo flex-container' value={selectedOption} onChange={handleChange}>
                            <option className='postBox__selectJogo-placeholder' value="" disabled hidden>Escolha um jogo</option>
                            {games.map((game) => (
                                <option key={game.id} value={game.id}>
                                    {game.name} {/* Substitua 'nome' pelo campo real que contém o nome do jogo */}
                                </option>
                            ))}
          
                        </select>
                        <div className="postBox__avaliacao">
                            <div className="txtAvaliacao__row">
                                <p>Avaliação</p>
                            </div>
                            <div className="postBox__nota-container">
                                {valoresNotas.map((valoresNotas, index) => (
                                    <div className={`postBox__nota`}
                                        key={valoresNotas}
                                        data-note={valoresNotas}
                                        onClick={(event) => handleNotaClick(event)}>
                                        {valoresNotas}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="postBox__opiniao-container">
                            <div className="postBox__opiniao">
                                <textarea className="postBox__opiniao-textarea" value={opiniao} placeholder='Digite a sua opinião' onChange={(event) => setOpiniao(event.target.value)} />
                                <div className="postBox__opiniao-image">
                                    {file && <img src={URL.createObjectURL(file)} alt="Imagem anexada" />}
                                </div>
                                <div className="postBox__opiniao-icon">
                                    <label htmlFor="file">
                                        <Icon icon={attachmentIcon} />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        accept=".jpg, .jpeg, .png"
                                        className="postBox__icon"
                                    />
                                 </div>
                            </div>
                        </div>
                        <button className='botao postBox__button' disabled={!isFormValid} onClick={handlePost}>Postar</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default PostButton;
