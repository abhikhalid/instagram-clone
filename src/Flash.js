import React from 'react';

import './Flash.css';

import instagramHomeLogo from "./instagram_home_logo.png";

import instaMetaLogo from './instra_meta_logo.png';

const Flash = () => {
    return (
        <div className="flash">
            <div className="flash__container">
                <img src={instagramHomeLogo} alt="" className="flashLogo" />
                
                <div className="flash__containerFooter">
                    <p>from</p>
                    <img src={instaMetaLogo} alt="" className='flashFooterLogo'/>
                </div>
            </div>
        </div>
    );
};

export default Flash;