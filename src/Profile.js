import { Avatar, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

import './Profile.css';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ProfilePost from './ProfilePost';
import Footer from './Footer';
import { useStateValue } from './StateProvider';

import { db } from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const Profile = () => {

    const [{ user }, dispatch] = useStateValue();

    const [posts, setPosts] = useState([]);


    useEffect(() => {

        db.collection('posts').orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (


                setPosts(snapshot.docs.filter(doc => {
                    return doc.data().username === user.displayName
                }).map((doc) => {
                    return {
                        id: doc.id,
                        post: doc.data()
                    };
                }))
            ))


    }, [])

    console.log(posts);



    return (
        <div className="profile">

            <div className="profile__top">
                <div className="profile__left">
                    <Avatar
                        alt={user.displayName}
                        src={user.photoURL}
                        sx={{ width: 144, height: 144 }}
                    />
                </div>
                <div className="profile__right">

                    <div className="profile__title">
                        <p style={{ fontSize: '26px', color: '#645954' }}>Khan.abhi</p>
                        <Button>Edit Profile</Button>
                        <SettingsOutlinedIcon fontSize="medium" style={{ color: 'black' }} />
                    </div>

                    <div className="profile__following">

                        <p><span style={{ fontWeight: '500' }}>282</span> posts</p>
                        <p><span style={{ fontWeight: '500' }}>71</span> followers</p>
                        <p><span style={{ fontWeight: '500' }}>533</span> following</p>
                    </div>

                    <div className="profile__descriptinon">

                        <p style={{ fontWeight: '500' }}>Abhi Khan</p>
                        <p>Software Engineer at BJIT</p>
                        <p>Bangladeshi</p>
                        <p>Muslim</p>

                    </div>

                </div>
            </div>


            <div className="profile__posts">




                {
                    posts.length > 0 ? (
                        posts.map(post => (

                         
                            <ProfilePost postId={post.id} post={post.post} />


                        ))
                    ) : (<h1>No Post Found</h1>)
                }

            </div>

            <Footer />

        </div>
    );
};

export default Profile;