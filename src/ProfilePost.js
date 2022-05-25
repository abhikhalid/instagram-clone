import React, { useEffect, useState } from 'react';

import './ProfilePost.css';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

import { db } from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { Link } from 'react-router-dom';

const ProfilePost = ({ postId, post }) => {

    const [totalComment, setTotalComment] = useState(0);


    useEffect(() => {

        db.collection('posts').doc(postId).collection('comments').onSnapshot(snapshot => (
            // setComments(snapshot.docs.map(doc => doc.data()))

            setTotalComment(snapshot.docs.length)
        ))


    }, [])



    return (
        <Link to={`/profilepostdetail/${postId}`}>
            <div className="profilePost" style={{ backgroundImage: `url(${post.imageUrl})` }}>

                <div className="profilePostShadow">

                    <div className="profilePost__twoIcon">
                        <div className="profilePost__icons">

                            <FavoriteIcon /> <span style={{ color: 'white', fontWeight: '500' }}>{post.like}</span>
                            <ModeCommentIcon /> <span style={{ color: 'white', fontWeight: '500' }}>{totalComment}</span>

                        </div>
                    </div>


                </div>



            </div>
        </Link>
    );
};

export default ProfilePost;