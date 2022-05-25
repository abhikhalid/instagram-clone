import React from 'react';
import ChatList from './ChatList';
import Message from './Message';
import './Messages.css';
import { useStateValue } from './StateProvider';

const Messages = () => {

    const [{ user }, dispatch] = useStateValue();

    // console.log(user);

    return (
        <div className="messages">
            <div className="messages__container">

                <div className="messages__chatList">

                    <ChatList/>

                </div>

                <div className="messages__inbox">
                    
                    {/* <Message/> */}
                    

                </div>



            </div>


        </div>
    );
};

export default Messages;