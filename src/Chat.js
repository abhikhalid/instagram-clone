import React, { useEffect, useState } from 'react';

import './Chat.css';

import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { db } from './firebase';


const Chat = ({ src, roomName, id }) => {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        if (id) {

            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot => (

                    setMessages(snapshot.docs.map((doc) => doc.data()))

                ))

        }

    }, [id])


    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000));

    }, [])


    return (
        <Link to={`/rooms/${id}`} style={{ textDecoration: 'none' }}>
            <div className="chat">

                <div className="chat__header">
                    <div className="chat__headerLeft">
                        <Avatar
                            alt={roomName}
                            src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
                            sx={{ width: 54, height: 54, marginLeft: '15px' }}
                        />



                    </div>

                    <div className="chat__headerRight">

                        <p style={{ color: '#262626', fontWeight: '400', marginLeft: '5px' }}>{roomName}</p>
                        <p style={{ color: '#262626', fontWeight: '400', marginLeft: '5px' }}>{messages[0]?.message}</p>


                    </div>
                </div>

            </div>
        </Link>
    );
};

export default Chat;