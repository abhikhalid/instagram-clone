import React, { useState, useEffect } from 'react';
import './Post.css';

import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';


import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import Button from '@mui/material/Button';
import { useStateValue } from './StateProvider';

import { db } from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const Post = ({ postId, caption, imageUrl, timestamp, username, avatar, like }) => {

    const [{ user }, dispatch] = useStateValue();

    const [input, setInput] = useState('');

    const [comments, setComments] = useState([]);

    const [isLikeClicked, setIsLikeClicked] = useState(false);

    useEffect(() => {

        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => (
                setComments(snapshot.docs.map(doc => doc.data()))
            ))

    }, [])



    const submitCommentHandler = (event) => {

        event.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            comment: input,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profileImage: user.photoURL,
        })

        setInput('');


    }

    const likeBtnHandler = () => {

        // alert('hey')

        if (isLikeClicked) {
            db.collection('posts').doc(postId).set({
                like: like - 1,
            }, { merge: true })

            setIsLikeClicked(false);

        }
        else {
            db.collection('posts').doc(postId).set({
                like: like + 1,
            }, { merge: true })

            setIsLikeClicked(true);

        }






    }

    // console.log(comments);

    return (
        <div className="post">

            <div className="post__header">

                <Avatar className='post__avatar'
                    src={avatar}
                    sx={{ width: 30, height: 30 }}
                />

                <h4 className="post__title">{username}</h4>



            </div>

            <div className="post__middle">

                <img
                    className="post__image"
                    src={imageUrl}
                    alt={caption} />

                <div className="post__button">


                    <div className="post__buttonLeft">

                        <IconButton>
                            {
                                !isLikeClicked ? (<FavoriteBorderOutlinedIcon onClick={likeBtnHandler} />) : (<FavoriteIcon onClick={likeBtnHandler} />)
                            }

                        </IconButton>
                        <IconButton>
                            <CommentOutlinedIcon />
                        </IconButton>
                        <IconButton>
                            <ShareOutlinedIcon />
                        </IconButton>
                    </div>

                    <div className="post__buttonRight">
                        <IconButton>
                            <BookmarkBorderOutlinedIcon />
                        </IconButton>

                    </div>





                </div>

                <div className="post__description">
                    <Avatar
                        src={avatar}
                        sx={{ width: 24, height: 24 }}
                    />

                    <p style={{ paddingLeft: '10px' }}>Liked by <span className='post__descriptionName'>steve_jobs</span> and <span className='post__descriptionNumber'>{like} others</span></p>


                </div>

                <div className="post__comments">
                    {
                        comments.map((comment) => (
                            <p>
                                <strong>{comment.username}</strong> {comment.comment}
                            </p>
                        ))
                    }
                </div>

                {/* <h6 className='post__timestamp'>{new Date(timestamp?.toDate()).toUTCString())} HOURS AGO</h6> */}

            </div>

            <form className="post__footer">

                <EmojiEmotionsOutlinedIcon style={{ color: '#414141' }} fontSize="large" />

                <div className="post__input">
                    <input type="text" placeholder="Add a comment..." value={input} onChange={e => setInput(e.target.value)} />
                </div>

                <div className="post__commentSubmit">


                    <Button
                        className={`${input ? "active" : ""}`}
                        disabled={!input} style={{ color: 'rgb(179, 223, 252)', textTransform: 'inherit', fontWeight: '550' }} onClick={submitCommentHandler} type="submit">Post</Button>




                </div>



            </form>

        </div >

    );
};

export default Post;