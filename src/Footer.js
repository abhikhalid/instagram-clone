import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div>
            <div className="footer">

                <div className="profile__footerTop">

                    <p style={{ color: 'gray', marginBottom: '12px' }}>
                        <span style={{ paddingRight: '16px', fontSize: '10px' }}>Meta</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}>About</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}>Blog</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}>Jobs</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}>Help</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}> API</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}>Privacy</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}>Terms</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}>Hashtags</span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}> Locations </span>
                        <span style={{ paddingRight: '16px', fontSize: '11px' }}>Instagram Lite</span>
                    </p>
                </div>

                <div className="profile__bottom">

                    <p style={{ color: 'gray', fontSize: '11px' }}>English    <span style={{ fontSize: '9px', marginLeft: '10px' }}>Ⓒ </span>2022 Instagram from Meta</p>

                </div>

            </div>

        </div>
    );
};

export default Footer;