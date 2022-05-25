import React from 'react';

import './Widgets.css';

import Avatar from '@mui/material/Avatar';
import Suggestion from './Suggestion';
import { useStateValue } from './StateProvider';


const Widgets = () => {

    const [{ user }, dispatch] = useStateValue();

    return (
        <div className="widgets">
            <div className="widgets__header">
                <Avatar
                    src={user?.photoURL}
                    sx={{ width: 50, height: 50 }}
                />

                <div className="widgets__headerMiddle">
                    <h5>Khan.abhi</h5>
                    <p style={{ color: '#BDBDBD' }}>Abhi Khan</p>
                </div>

                <h6 style={{ color: '#30A8F7' }}>Switch</h6>

            </div>

            <div className="widgets__suggestion">
                <h3>Suggestions For You</h3>
                <h4>See All</h4>
            </div>

            <div className="widgets__suggestionList">

            </div>

            <div className="widgets__suggested">

                <Suggestion src="https://upload.wikimedia.org/wikipedia/commons/8/86/Salman_Khan_at_Renault_Star_Guild_Awards.jpg" title="Salman Khan" />
                <Suggestion src="https://www.pinkvilla.com/imageresize/akshay-kumar-main_5.jpg?width=752&format=webp&t=pvorg" title="Akkhay Kumar" />
                <Suggestion src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Deepika_Padukone_Cannes_2018_%28cropped%29.jpg" title="Deepika Padukone" />
                <Suggestion src="https://m.media-amazon.com/images/M/MV5BMjAxNzUwNjExOV5BMl5BanBnXkFtZTcwNDUyMTUxNw@@._V1_.jpg" title="Prianka Chopra" />
                <Suggestion src="https://images.genius.com/49ad70b2123be1205edfe119c16b5eaa.985x985x1.jpg" title="Mr.Robot" />
                <Suggestion src="https://cdn.britannica.com/66/188766-050-38F1436A/Mark-Zuckerberg-2010.jpg" title="Mark Zuckerberg" />

            </div>

            <div className="widgets__footer">
                <div className="widgets__line1">
                    <p>About . Help . Press . API . Jobs . Privacy . Terms</p>

                </div>

                <div className="widgets__line2">

                    <p>Locations . Top Accounts . Hashtags . Language</p>

                </div>

                <div className="widgets__line3">
                    <p>	&copy; 2022 INSTAGRAM FROM META</p>

                </div>
            </div>



        </div>
    );
};

export default Widgets;