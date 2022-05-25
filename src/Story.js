import { Avatar } from '@mui/material';
import React, { useState } from 'react';

import './Story.css';
import ViewStory from './ViewStory';

const Story = ({ story, src, addStory, storyUploadHandler }) => {

    const [storyDetail, setStoryDetail] = useState(false);

    return (
        <>
            <div className="story" onClick={() => {
                if (!addStory) {
                    setStoryDetail(!storyDetail)
                } else {
                    storyUploadHandler();
                }


            }}>

                <div className="story__avatar">
                    {
                        src ? (<Avatar sx={{ width: 50, height: 50, margin: 1 }} src={src} style={{ border: '4px solid #F00418' }} />)
                            : (
                                <Avatar sx={{ width: 50, height: 50, margin: 1 }} src={story?.image} style={{ border: '4px solid #F00418' }} />
                            )
                    }

                </div>



            </div>
            {
                storyDetail && !src && <ViewStory setStoryDetail={setStoryDetail} story={story} />
            }
        </>
    );
};

export default Story;