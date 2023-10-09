import '../components/postButton.css'

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import sharpSendIcon from '@iconify-icons/ic/sharp-send';
import attachmentIcon from '@iconify-icons/ic/attachment';
import CloseIcon from '../icons/close.svg';
import { ToastContainer, toast } from 'react-toastify';


const PostButton = () => {
    const [postBox, setPostBox] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [file, setFile] = useState(null);
 
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
                            <option className='postBox__selectJogo-placeholder' value="" disabled select hidden >Escolha um jogo</option>
                            <option value="teste">Teste</option>
                        </select>
                        <div className="postBox__avaliacao">
                            <div className="txtAvaliacao__row">
                                <p>Avaliação</p>
                            </div>
                            <div className="postBox__nota-container">
                                {valoresNotas.map((valoresNotas) => (
                                    <div className="postBox__nota" key={valoresNotas}>
                                        {valoresNotas}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="postBox__opiniao-container">
                            <div className="postBox__opiniao">
                                <textarea className="postBox__opiniao-textarea" placeholder='Digite a sua opinião' />
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
                        <button className='postBox__button'>Postar</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default PostButton;
