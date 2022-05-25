import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import './AccountMenu.css';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';

import {

    Link, useHistory
} from "react-router-dom";
import { auth } from './firebase';

// import Header from "./Header;

export default function AccountMenu({ src, alt }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const history = useHistory();

    const [avatarBorder, setAvatarBorder] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOutHandler = () => {


        localStorage.setItem("user", "0");
        
        auth.signOut();


        history.push("/login");

    }

    // console.log(src);


    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: -1, mt: -1.0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{ width: 30, height: 30 }}
                            src={src}
                            alt={alt}
                            onClick={() => {
                                setAvatarBorder(!avatarBorder);
                                // alert('hey');
                            }}
                            className={`${avatarBorder && "abc"}`}
                        // style={{border: '2px solid black', padding: '0.3px'}}
                        />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        width: 210,
                        p: 1,
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >


                <MenuItem>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon fontSize="small" style={{ color: 'gray' }} />
                    </ListItemIcon>
                    <Link to="/profile">
                        <p style={{ color: 'black', fontSize: '14px', textDecoration: 'none' }}>Profile</p>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <BookmarkAddedOutlinedIcon fontSize="small" style={{ color: 'gray' }} />
                    </ListItemIcon>
                    <p style={{ color: 'black', fontSize: '14px' }}>Saved</p>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SettingsOutlinedIcon fontSize="small" style={{ color: 'gray' }} />
                    </ListItemIcon>
                    <p style={{ color: 'black', fontSize: '14px' }}>Settings</p>

                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <SwitchAccountOutlinedIcon fontSize="small" style={{ color: 'gray' }} />
                    </ListItemIcon>
                    <p style={{ color: 'black', fontSize: '14px' }}>Switch Accounts</p>

                </MenuItem>


                <Divider />

                <p style={{ marginLeft: '10px', fontSize: '14px' }} onClick={signOutHandler}>Log  Out</p>

            </Menu>
        </React.Fragment>
    );
}
