import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';

import { storage, db } from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useStateValue } from './StateProvider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function StoryUploader({ image, setImage }) {

    const [{ user }, dispatch] = useStateValue();

    const [progress, setProgress] = React.useState(0);

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setImage(null);
    }



    //code to upload story to database
    const uploadStoryHandler = () => {

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function...

                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                console.log(progress);

                setProgress(progress);
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

                        db.collection('stories').add({

                            avatar: user.photoURL,
                            image: url,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            username: user.displayName,

                        })


                        setImage(null);
                        alert('Story Uploaded Successfully!');
                        setOpen(false);


                    })


            }
        )

    }



    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{ display: "grid", placeItems: 'center' }}>

                    <Button variant="contained" onClick={uploadStoryHandler}>Upload</Button>

                    <h1>File is being uploaded {progress} %</h1>

                </Box>
            </Modal>
        </div>
    );
}
