import { Avatar } from '@mui/material';
import React from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


import './ViewStoryHeader.css';

const ViewStoryHeader = ({ story }) => {
    return (
        <div className='viewStoryHeader'>

            <Avatar
                alt="deepika"
                src={story.image}
                sx={{ width: 34, height: 34 }}
            />

            <div className="viewStoryHeader__center">

                <p style={{ color: '#FFFFFF', fontSize: '12px' }}>{story.username} <span style={{ paddingLeft: '10px', color: 'whitesmoke' }}>3h</span></p>
                <p style={{ color: '#FFFFFF', fontSize: '12px' }}>paid partnership</p>

            </div>

            <div className="viewStoryHeader__right">

                <PlayArrowIcon style={{ color: '#000', marginRight: '10px', fontWeight: '500' }} />
                <VolumeOffIcon style={{ color: '#000', marginRight: '10px', fontWeight: '500' }} />
                <MoreHorizIcon style={{ color: '#000', fontWeight: '500' }} />
            </div>



        </div>
    );
};

export default ViewStoryHeader;