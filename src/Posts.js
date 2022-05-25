import React, { useEffect, useState } from 'react';
import Post from './Post';

import './Posts.css';
import Stories from './Stories';

import { db, auth } from './firebase';

const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {

            //every time a new post is added, this code fires...

            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));

        })



    }, [])


    // console.log(posts);




    return (
        <div className="posts">

            <Stories />

            {
                posts.length > 0 ? (posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        postId={id}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                        timestamp={post.timestamp}
                        username={post.username}
                        avatar={post.avatar}
                        like={post.like}

                    />
                ))) : ((<h1>No Post Found! You're boring! Add some Friends!</h1>))
            }

        </div>
    );
};

export default Posts;