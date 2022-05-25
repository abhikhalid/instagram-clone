import React from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import SendIcon from '@mui/icons-material/Send';

import './ViewStoryFooter.css';

const ViewStoryFooter = () => {
    return (
        <div className="viewStoryFooter">

            <div className="viewStoryFooter__left">

                <div className="viewStoryFooter__input">

                    <input type="text" placeholder="Reply to codemyjourney..." />

                </div>

            </div>

            <div className="viewStoryFooter__right">
                <FavoriteBorderIcon />

                <SendIcon className="videoStoryFooter__sendIcon"/>

            </div>

        </div>
    );
};

export default ViewStoryFooter;