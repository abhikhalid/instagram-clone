import React, { useEffect, useState } from 'react';

import './ChatList.css';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Chat from './Chat';
import { db } from './firebase';


import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

const ChatList = () => {

    const [rooms, setRooms] = useState([]);

    const [{ }, dispatch] = useStateValue();

    useEffect(() => {

        db.collection('rooms').onSnapshot(snapshot => (

            setRooms(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data(),
                }
            }))

        ))

     

      

    }, [])


    const addARoomHandler = () => {

        const roomName = prompt("Please enter name for chat room");

        if (roomName) {
            // do some clever database stuff...

            db.collection('rooms').add({
                name: roomName,
            })
        }

    }


    return (
        <div className='chatList'>
            <div className="chatList__header">

                <div className="chatList__userTitleHeader">
                    <p style={{ fontWeight: '600' }}>Khan.abhi</p>
                    <KeyboardArrowDownOutlinedIcon style={{ fontSize: '40px', position: 'absolute', top: '5', right: '100px', fontWeight: '100 !important' }} />
                </div>

                <EditOutlinedIcon onClick={addARoomHandler} />


            </div>

            <div className="chatList__allChats">

                {
                    rooms.map(room => (
                        <Chat
                            key={room.id}
                            id={room.id}
                            roomName={room.data.name}
                        />
                    ))

                }




            </div>


        </div>
    );
};

export default ChatList;