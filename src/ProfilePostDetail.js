import React, { useEffect, useState } from 'react';

import './CreatePost.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Avatar, Grid, IconButton, Stack } from '@mui/material';


import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import VideoSettingsOutlinedIcon from '@mui/icons-material/VideoSettingsOutlined';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ProfilePostDetailComment from './ProfilePostDetailComment';
import { useParams } from 'react-router-dom';

import { db, auth } from './firebase';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { useStateValue } from './StateProvider';
import { dblClick } from '@testing-library/user-event/dist/click';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { useHistory } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    height: 600,
    bgcolor: 'background.paper',
    // border: '1px solid #000',
    borderRadius: 3,
    p: 4
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));





const ProfilePostDetail = (props) => {


    const history = useHistory();

    let { postId } = useParams();

    // console.log(postId);

    const [{ user }, dispatch] = useStateValue();

    // console.log(user);


    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);

        props.setCreatePost(false);

        history.push("/profile");

        console.log('this is close!');

    }

    const [post, setPost] = useState([]);

    const [comments, setComments] = useState([]);

    const [input, setInput] = useState('');

    useEffect(() => {

        db.collection('posts').doc(postId).collection('comments').onSnapshot(snapshot =>

            setComments(snapshot.docs.map(doc => doc.data()))
        )



        db.collection('posts').onSnapshot(snapshot => (
            setPost(snapshot.docs.filter(doc =>
                doc.id === postId
            ).map(doc =>
                doc.data()
            ))
        ))


    }, [])

    console.log(post);

    // console.log(post[0]?.like);


    const commentSubmitHandler = (e) => {
        e.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            comment: input,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profileImage: user.photoURL,
        })

        setInput('');

    }


    const getBacktoProfilePage = () => {
        
        // history.push("/");
        history.push("/profile");
    }


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


                    <Grid container spacing={2} style={{ marginTop: '-50px', height: '480px' }}>
                        <Grid item xs={6}>
                            <Item style={{ marginTop: '-14px', marginLeft: '-30px', boxShadow: 'none' }}>
                                <img src={post[0]?.imageUrl} alt=""
                                    style={{ objectFit: 'contain', width: '100%', height: '600px' }}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs="auto" md={8}>
                                <Item style={{ width: '38vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'none', borderBottom: '1px solid lightgray' }}>
                                    <Avatar
                                        alt="Khan.abhi"
                                        src={user.photoURL}
                                        sx={{ width: 30, height: 30 }}
                                    />

                                    <p style={{ fontWeight: '550', color: '#000', paddingRight: '440px', marginLeft: '15px', fontSize: '14px' }}>Khan.abhi</p>

                                    <MoreHorizIcon fontSize="small" />

                                </Item>

                                <Stack spacing={2} style={{ paddingTop: '20px', paddingBottom: '20px', msOverflowY: 'scroll' }}>

                                    {

                                        comments.map(comment => <ProfilePostDetailComment comment={comment} />)
                                    }
                                </Stack>



                                <div className="profilePostDetailComments">
                                    <div className="ProfilePostDetailComment__footer">

                                        <div className="ProfilePostDetailComment__footerLeft">
                                            <div className="profilePostDetailComment__footerIcon">

                                                <FavoriteBorderIcon />
                                                <MessageOutlinedIcon />
                                                <ShareOutlinedIcon />
                                            </div>

                                            <div className="profilePostDetailComment__footerLiked">
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://www.iwmbuzz.com/wp-content/uploads/2021/12/kgf-fame-yash-is-here-with-some-sensational-beard-grooming-goals-check-pics-and-take-cues-2.jpeg"
                                                    sx={{ width: 20, height: 20 }}
                                                    style={{ marginTop: '10px' }}
                                                />
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Mahesh_Babu_in_Spyder_%28cropped%29.jpg"
                                                    sx={{ width: 20, height: 20 }}
                                                    style={{ marginTop: '10px', position: 'relative', left: '-10px', zIndex: '-1' }}
                                                />
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHjseHiMIj8Ar2r12M3BcOn-k6bGGs3cQ2nQ&usqp=CAU"
                                                    sx={{ width: 20, height: 20 }}
                                                    style={{ marginTop: '10px', position: 'relative', left: '-18px', zIndex: '-2' }}
                                                />
                                                <p style={{ fontSize: '14px' }}>Liked by <span style={{ fontWeight: '500' }}>mohasina_akter</span> and <span style={{ fontWeight: '500' }}>{post[0]?.like} others</span></p>
                                            </div>

                                            <p style={{ fontSize: '10px', color: 'gray', marginTop: '10px' }}>{new Date(post[0]?.timestamp?.toDate()).toUTCString()}</p>


                                        </div>

                                        <div className="ProfilePostDetailComment__footerRight">

                                            <BookmarkBorderOutlinedIcon />

                                        </div>





                                    </div>






                                </div>
                                <form className="ProfilePostDetailComment__submit">

                                    <EmojiEmotionsOutlinedIcon />


                                    <input type="text" placeholder="Add a comment..." value={input} onChange={e => setInput(e.target.value)} />

                                    <Button type="submit" onClick={commentSubmitHandler}>Post</Button>

                                </form>






                            </Grid>

                        </Grid>

                    </Grid>

                </Box>
            </Modal>

            <CloseIcon style={{ color: 'white', fontSize:'40px',position: 'absolute', right:'20px',top:'-30px' }} onClick={getBacktoProfilePage} />

        </div >
    );
};

export default ProfilePostDetail;