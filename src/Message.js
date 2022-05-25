import React, { useEffect, useRef, useState } from 'react';

import './Message.css';

import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';

import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { db } from './firebase';
import { useParams } from 'react-router-dom';

import firebase from "firebase/compat/app";
import { useStateValue } from './StateProvider';

import InputEmoji from 'react-input-emoji'

import { storage } from './firebase';

import "firebase/compat/firestore";

import SendIcon from '@mui/icons-material/Send';
import { actionTypes } from './reducer';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CloseIcon from '@mui/icons-material/Close';

const Message = () => {

    const { id } = useParams();

    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState('');



    const [{ user, messageEmpty }, dispatch] = useStateValue();

    const [roomName, setRoomName] = useState([]);

    const [seed, setSeed] = useState('');

    //photo message send
    const [image, setImage] = useState(null);

    const hiddenFileInput = React.useRef(null);

    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = e => {

        if (e.target.files[0]) {
            setImage(e.target.files[0]);

        }


    };



    const sendImageHandler = () => {

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

                        db
                            .collection('rooms')
                            .doc(id)
                            .collection('messages')
                            .add({

                                avatar: user.photoURL,
                                image: url,
                                message: "",
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                username: user.displayName,

                            })


                        setImage(null);



                    })


            }
        )





    }









    //photo message send


    // auto scroll to buttom
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    // auto scroll to buttom



    //Emoji Keyboard

    const [emojiClicked, setEmojiClicked] = useState(false);


    //submit message

    function handleOnEnter(text) {

        db.collection('rooms').doc(id).collection('messages').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            image: "",
            username: user.displayName,
            avatar: user?.photoURL || null,
        })

        setInput("");


    }

    //Emoji Keyboard






    useEffect(() => {

        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
            setMessages(snapshot.docs.map(doc => doc.data()))
        ))

        db.collection('rooms').onSnapshot(snapshot => (
            setRoomName(snapshot.docs.map(doc => {
                if (doc.id === id) {
                    return doc.data();
                }
            }))
        ))




    }, [])





    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000));

    }, [])




    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const [imageUrl, setImageUrl] = useState("");


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const setImageModal = (url) => {

        setOpen(true);

        setImageUrl(url);

    }





    return (
        <>
            <div className={`message ${messageEmpty && "message-empty"}`}>

                {messageEmpty && <div className="message__emptyMessageContanier">
                    <ForumOutlinedIcon />

                    <p style={{ color: '#6C6C6C', margin: '10px 0', fontSize: '23px', fontWeight: '100' }}>Your Messages</p>

                    <p style={{ color: '#8E8E8E', marginBottom: '10px' }}>Send private photos and messages to a friend or group.
                    </p>

                    <Button style={{ color: 'white', backgroundColor: '#0095F6', borderRadius: '6px', width: 'fit-content', textTransform: 'inherit', margin: '0 auto', height: '4.3vh', marginTop: '10px' }}>Send Message</Button>

                </div>}


                {!messageEmpty && (<div className="message__container">

                    <div className="message__containerHeader">

                        <div className="message__containerHeaderLeft">
                            <Avatar
                                alt="Joe Biden"
                                src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                                sx={{ width: 30, height: 30 }}
                            />

                            <div className="message__headerTitleActiveStatus">
                                <p style={{ color: '#262626', fontWeight: '500', fontSize: '16px' }}>{roomName[0]?.name}</p>
                                <p style={{ color: '#8E8E8E', fontSize: '13px' }}>Active today</p>
                            </div>
                        </div>
                        <div className="message__containerHeaderRight">
                            <CallOutlinedIcon />
                            <VideocamOutlinedIcon

                            />
                            <InfoOutlinedIcon

                            />

                        </div>
                    </div>

                    <div className="message__messages">



                        {
                            messages.map(message => (
                                <div className={`message__message ${message.username === user.displayName && "message_message-self"} ${!message.image && "message__border"}}`}>
                                    {!(message.username === user.displayName) && <Avatar
                                        alt="Joe Biden"
                                        src={message.avatar}
                                        sx={{ width: 35, height: 35 }}
                                        style={{ marginRight: '10px' }}
                                    />}

                                    {
                                        message.image ? (
                                            <img src={message.image} alt={message.username} style={{ width: '150px', objectFit: 'contain' }} onClick={() => setImageModal(message.image)} />
                                        ) : (
                                            <p>{message.message}</p>
                                        )
                                    }


                                </div>



                            ))
                        }



                        <div ref={messagesEndRef}></div>

                    </div>




                    <form className="message__footer">


                        <div className="emoji__container">

                            <InputEmoji
                                className="emoji"
                                value={input}
                                onChange={setInput}
                                cleanOnEnter
                                onEnter={handleOnEnter}
                                placeholder="Enter a message"
                            />

                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <PhotoLibraryOutlinedIcon onClick={handleClick} />
                            {image && <SendIcon onClick={sendImageHandler} />}

                        </div>





                    </form>




                </div>
                )
                }





            </div >

            <div className="meesageImageViewContainer">
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box onClick={handleClose} style={{ width: '600px', borderRadius: '10px', marginLeft: '-33px', }}>
                        <img src={imageUrl} style={{ height: '400px', objectFit: 'contain' }} className="messageImage" />

                        {/* <CloseIcon  className="messageImageViewerCloseBtn" /> */}

                    </Box>
                </Modal>

            </div>


        </>
    );
};

export default Message;