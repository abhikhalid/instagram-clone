import { Avatar, Button } from '@mui/material';
import React from 'react';

import './ProfilePostDetailComment.css';



const ProfilePostDetailComment = ({ comment }) => {



    return (
        <>
            <div className="ProfilePostDetailComment">
                <div>

                    <div >

                        <Avatar
                            alt={comment.username}
                            src={comment.photoURL}
                            sx={{ width: 30, height: 30 }}
                        />

                        <div className="profilePostDetailComment__right">
                            <div className="profilePostDetailComment__titleCaption">
                                <p style={{ fontSize: '14px', fontWeight: '600', paddingRight: '10px' }}>{comment.username}</p>

                                <p style={{ fontSize: '14px', paddingRight: '10px' }}>{comment.comment}</p>
                            </div>

                            <div className="profilePostDetailComment__timestampComment">

                                <p style={{ paddingRight: '10px', fontSize: '11px', color: 'gray' }}>{new Date(comment.timestamp?.toDate()).toUTCString()}</p>

                                <p style={{ paddingRight: '10px', fontSize: '11px', color: 'gray', fontWeight: '500' }}>10 like</p>

                                <p style={{ paddingRight: '10px', fontSize: '11px', color: 'gray', fontWeight: '500' }}>Reply</p>

                            </div>


                        </div>


                    </div>



                </div>



            </div>






        </>

    );
};

export default ProfilePostDetailComment;