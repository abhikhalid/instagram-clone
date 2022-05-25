import { Avatar } from '@mui/material';
import React from 'react';

import './Suggestion.css';

const Suggestion = ({ src, title }) => {
    return (
        <div className="suggestion">

            <Avatar
                sx={{ width: 24, height: 24 }}
                src={src}
            />

            <div className="suggestion__title">

                <p style={{ fontWeight: '700', fontSize: '12px' }}>{title}</p>
                <p style={{ fontSize: '12px', color: 'gray' }}>Suggested for you</p>

            </div>

            <p className='suggestion__follow'>Follow</p>

        </div >
    );
};

export default Suggestion;