import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Ícone de fechar

import '../components/LightBox.css'

const Lightbox = ({ imageSrc, onClose }) => {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content">
        <img src={imageSrc} alt="Imagem do post" />
        <button className="lightbox-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;