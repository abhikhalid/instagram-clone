import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';

import './ViewStory.css';
import ViewStoryHeader from './ViewStoryHeader';
import ViewStoryFooter from './ViewStoryFooter';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 550,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function ViewStory({ setStoryDetail, story, storyUploadHandler }) {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setStoryDetail(false); }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="viewStory" style={{ backgroundImage: `url(${story.image})` }} >
                    <IconButton>
                        <CloseOutlinedIcon style={{ position: 'absolute', top: '-40px', left: '810px', color: 'white', zIndex: '99999 !important', fontSize: '35px !important' }} onClick={() => setOpen(false)} />
                    </IconButton>

                    <ViewStoryHeader story={story} />

                    <ViewStoryFooter />


                </Box>
            </Modal>
        </div>
    );
}
