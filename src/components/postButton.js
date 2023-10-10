import '../components/postButton.css'

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import sharpSendIcon from '@iconify-icons/ic/sharp-send';
import attachmentIcon from '@iconify-icons/ic/attachment';
import CloseIcon from '../icons/close.svg';
import { toast } from 'react-toastify';

import api from '../services/Api';
import { getUser } from "../services/Auth";

const PostButton = () => {

    const [games, setGames] = useState([]);
    const [postBox, setPostBox] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedNota, setSelectedNota] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');
    const [opiniao, setOpiniao] = useState('');
    const [file, setFile] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [userId, setUserId] = useState(null);


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
    const handleChangeNote = (event) => {
        const note = Number(event.target.getAttribute('data-note'));
        if (note) {
            //alert(note);
            const notes = document.getElementsByClassName('postBox__nota');
            if (notes.length > 0) {

                for (let i = 0; i < notes.length; i++) {
                    notes[i].classList.remove('checked');
                }

                for (let i = 0; i < notes.length; i++) {
                    let temp = Number(notes[i].getAttribute('data-note'));
                    if (temp <= note) {
                        notes[i].classList.toggle('checked');
                    }
                }

                setSelectedNota(note);

            }
        }
    }

    useEffect(() => {

        const fetchDataUser = async () => {
            try {
                const user = await getUser();
                if (!user) {
                    return;
                } else {
                    const response = await api.get(`/api/users?id=${user.id}`);
                    if (response.data.id) {
                        setUserId(user.id);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchDataUser(); // Chama a função fetchData quando o componente for montado

        const fetchDataGames = async () => {
            await getGames();
        };

        fetchDataGames(); // Chama a função fetchData quando o componente for montado

        const formIsValid = selectedOption !== '' && selectedNota !== null && validateOpiniao();
        setIsFormValid(formIsValid);

    }, []);


    const coresDasNotas = [
        "#A70000",
        "#AF1C00",
        "#B83500",
        "#C04D00",
        "#C86500",
        "#D07C00",
        "#D89400",
        "#E0AB00",
        "#E8C300",
        "#F0DA00",
        "#F9F200",
        "#FFFC00",
        "#FFFC00",
        "#C4FA00",
        "#C4FA00",
        "#88F800",
        "#6AE700",
        "#4CE600",
        "#2EE500",
        "#10D400",
        "#0094DC"
    ];

    //const handleNotaClick = (valoresNotas, event) => {
    //    if (valoresNotas === selectedNota) {
    //        // Se a nota clicada já estiver selecionada, deselecione-a
    //        setSelectedNota(null);
    //        setSelectedColor('');
    //        event.target.style.backgroundColor = ''; // Limpe a cor de fundo
    //    } else {
    //        // Caso contrário, selecione a nova nota e defina a cor correspondente
    //        setSelectedNota(valoresNotas);
    //        setSelectedColor(coresDasNotas[(valoresNotas / 0.5)]); // -1 porque o índice do array começa em 0

    //        // Defina a cor do elemento clicado para a cor da nota
    //        event.target.style.backgroundColor = coresDasNotas[(valoresNotas / 0.5)];

    //        // Desmarque a nota anterior definindo sua cor de fundo como vazia
    //        if (selectedNota !== null) {
    //            const previousSelectedNotaElement = document.querySelector(`.postBox__nota.selected`);
    //            if (previousSelectedNotaElement) {
    //                previousSelectedNotaElement.style.backgroundColor = '';
    //            }
    //        }
    //    }
    //};

    const validateOpiniao = () => {
        return opiniao.trim() !== ''; // Verifique se o campo não está vazio após remover espaços em branco
    };


    const handlePost = async () => {



        try {
            // const reviewId = event.target.id;


            // Verifique novamente se todos os campos obrigatórios estão preenchidos
            if (!isFormValid) {
                toast.error('Por favor, preencha todos os campos obrigatórios.', { position: toast.POSITION.TOP_RIGHT });
                return;
            }

            // Converter o selectedOption (game_id) para um número inteiro
            const gameId = parseInt(selectedOption, 10);

            // Certifique-se de que gameId é um número válido
            if (isNaN(gameId)) {
                toast.error('Por favor, selecione um jogo válido.', { position: toast.POSITION.TOP_RIGHT });
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

            // Enviar os dados para a API
            const response = await api.post(`/api/review?id=${postData.game_id}`, postData);

            if (response.status === 200) {
                // Postagem bem-sucedida
                toast.success('Postagem realizada com sucesso!', { position: toast.POSITION.TOP_RIGHT });
                // Limpar o formulário ou fazer outras ações necessárias após a postagem
                resetForm();
            } else {
                // Lidar com erros de postagem
                toast.error('Ocorreu um erro ao postar. Tente novamente mais tarde.', { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
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


    //useEffect(() => {
    //    // Verifique se todos os campos obrigatórios estão preenchidos
    //    const formIsValid = selectedOption !== '' && selectedNota !== null && validateOpiniao();
    //    setIsFormValid(formIsValid);
    //}, [selectedOption, selectedNota, opiniao]);


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

    //useEffect(() => {
    //    const fetchData = async () => {
    //        await getGames();
    //    };
    //    fetchData(); // Chama a função fetchData quando o componente for montado
    //}, []);


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
                                {/*{valoresNotas.map((valoresNotas, index) => (*/}
                                {/*    <div className={`postBox__nota ${valoresNotas === selectedNota ? 'selected' : ''}`}*/}
                                {/*        key={valoresNotas}*/}
                                {/*        onClick={(event) => handleChangeNote(event)}>*/}
                                {/*        {valoresNotas}*/}
                                {/*    </div>*/}
                                {/*))}*/}
                           
                                {valoresNotas.map((valoresNotas) => (
                                    <div className="postBox__nota" key={valoresNotas} data-note={valoresNotas} onClick={handleChangeNote}>
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
                        <button className='postBox__button' disabled={!isFormValid} onClick={handlePost}>Postar</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default PostButton;