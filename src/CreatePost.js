import React, { useState } from 'react';

import './CreatePost.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';


import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import VideoSettingsOutlinedIcon from '@mui/icons-material/VideoSettingsOutlined';

import { storage, db } from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useStateValue } from './StateProvider';

/**
 * @jest-environment node
 */

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 490,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 3,
    p: 4,
    flexGrow: 1
};





const CreatePost = (props) => {


    const [{ user }, dispatch] = useStateValue();

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");


    const [open, setOpen] = React.useState(true);

    const hiddenFileInput = React.useRef(null);

    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = e => {

        if (e.target.files[0]) {
            setImage(e.target.files[0]);

        }



    };

    // console.log(user);

    const handleUpload = () => {

        // console.log(image);

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function...

                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                console.log(progress);

                // setProgress(progress);
            },
            (error) => {
                //Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function...
                storage.ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db

                        db.collection('posts').add({

                            avatar: user.photoURL ,
                            caption: caption,
                            imageUrl: url,
                            like: 0,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            username: user.displayName ,

                        })


                        setImage(null);
                        setCaption("");
                        setOpen(false);
                        alert('Post Uploaded Successfully!');


                    })


            }
        )


    }

    // console.log(image);


    const handleOpen = () => setOpen(true);



    const handleClose = () => { setOpen(false); props.setCreatePost(false) }




    return (
        <div className="createPost">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <IconButton>
                        <CloseOutlinedIcon className='createPost__closeBtn' onClick={() => { setOpen(false); props.setCreatePost(false) }} />
                    </IconButton>

                    <div className="createPost__container">

                        <div className="createPost__containerHeader">
                            <p>Create new post</p>
                        </div>

                        <div className="createPost__containerBody">

                            <div className="createPost__photoGallert">
                                <PhotoLibraryOutlinedIcon className="createPost__photo1" />
                                <VideoSettingsOutlinedIcon className="createPost__photo2" />
                            </div>

                            <p style={{ color: '#5A5A5A', fontSize: '22px', fontWeight: '340', marginTop: '20px', marginBottom: '10px' }}>Drag photos and videos here</p>

                            <div className="createPost__inputContainer">
                                <input type="text" placeholder="Enter Caption" className='inputCaption' onChange={e => setCaption(e.target.value)} value={caption} />
                            </div>

                            <Button onClick={handleClick}>Select from computer</Button>
                            <Button onClick={handleUpload}>Upload</Button>

                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />

                        </div>

                    </div>



                </Box>
            </Modal>

        </div>
    );
};

export default CreatePost;