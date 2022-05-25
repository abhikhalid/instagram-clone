import React, { useState } from 'react';
import './Header.css';

import SearchIcon from '@mui/icons-material/Search';

import HomeIcon from '@mui/icons-material/Home';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Avatar from '@mui/material/Avatar';
import CreatePost from './CreatePost';
import AccountMenu from './AccountMenu';
import Notification from './Notification';

import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';

const Header = () => {

    const [createPost, setCreatePost] = useState(false);

    const [heartClick, setHeartClick] = useState(false);

    const [{ user }, dispatch] = useStateValue();

    // console.log(user);



    return (
        <>
            <div className="header">

                <div className="header__left">
                    <Link to="/">
                        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram logo" className="header__logo" />
                    </Link>
                </div>

                <div className="header__center">

                    <div className="header__input">
                        <SearchIcon />
                        <input type="text" placeholder="Search" className="header__placeholder" />
                    </div>
                </div>

                <div className="header__right">

                    <Link to="/">
                        <HomeIcon className="header__homeIcon" />
                    </Link>

                    <Link to="/messages">
                        <MarkUnreadChatAltOutlinedIcon className="header__message" />
                    </Link>
                    <AddCircleOutlineRoundedIcon onClick={() => setCreatePost(!createPost)} />
                    <ExploreOutlinedIcon />
                    <span className="header__heart">
                        <FavoriteBorderRoundedIcon onClick={() => setHeartClick(!heartClick)} />


                        {/* {
                            heartClick && <Notification />
                        } */}
                    </span>


                    <AccountMenu src={user.photoURL} alt={user.displayName} />

                </div>






            </div>

            {
                createPost && (<CreatePost setCreatePost={setCreatePost} />)
            }


        </>
    );
};

export default Header;