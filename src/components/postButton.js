import '../components/postButton.css'

import React from 'react';
import { Icon } from '@iconify/react';
import sharpSendIcon from '@iconify-icons/ic/sharp-send';

const postButton = () => {
    return (
        <div>
            <div className="container">
                <div className="btn__post">
                    {/* <Icon icon={sharpSendIcon} className='iconPost' width={24} height={24} color="#000" /> */}
                    <Icon icon={sharpSendIcon} className='icon__post' />
                    <span className='txt__post'>post</span>
                </div>
            </div>
        </div>
    );
}

export default postButton;