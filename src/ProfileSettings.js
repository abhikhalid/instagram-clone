import React from 'react';

import './ProfileSettings.css';

import Footer from './Footer';
import { Avatar, Button } from '@mui/material';

const ProfileSettings = () => {
    return (
        <>
            <div className="khalid1010">
                <div className="profileSettings">
                    <div className="profileSettingsLeft">
                        <div className="proflileSettings__Options">
                            <p><strong style={{ fontWeight: '650' }}>Edit Profile</strong></p>
                            <p>Change Password</p>
                            <p>Apps and Websites</p>
                            <p>Email Notifications</p>
                            <p>Push Notifications</p>
                            <p>Manage Contacts</p>
                            <p>Privacy and Security</p>
                            <p>Login Activity</p>
                            <p>Emails from Instagram</p>
                            <p>Help</p>
                        </div>

                        <div className="profileSettings__switchAccount">
                            <h5 style={{ color: '#0095F6', fontWeight: '640' }}>Switch to Professional</h5>
                            <h5 style={{ color: '#0095F6' }}>Account</h5>
                        </div>

                        <hr style={{ margin: '40px 0' }} />


                        <div className="profileSettings__footer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" alt="" style={{ width: '63px', objectFit: 'contain' }} />
                            <p style={{ color: 'rgb(0, 149, 246)', fontWeight: '500', margin: '10px 0' }}>Accounts Center</p>
                            <p style={{ color: 'gray', fontSize: '12px' }}>Control settings for connected experience across
                                Instagram the Facebook app and Messenger. including
                                story and post sharing and logging in.
                            </p>
                        </div>


                    </div>

                    <div className="profileSettingsRight">
                        <div className="profileSettings__header">
                            <Avatar
                                alt="Khan.abhi"
                                src="https://www.protocol.com/media-library/elon-musk.jpg?id=29293464&width=1245&quality=85&coordinates=0%2C67%2C0%2C68&height=700"
                                sx={{ width: 34, height: 34 }}

                            />

                            <div className="profileSettings__headerRight">
                                <p style={{ fontSize: '19px' }}>Khan.abhi</p>
                                <p style={{ color: 'rgb(0, 149, 246)', fontWeight: '500' }}>Change Profile Photo</p>
                            </div>


                        </div>

                        <div className="profileSettings__form">
                            <div className="profileSettings__group">
                                <div>
                                    <p style={{ fontWeight: '500' }}>Name</p>
                                </div>

                                <div className="profileSettings__input">
                                    <input style={{ backgroundColor: 'rgb(238, 237, 237)' }} type="text" placeholder="Abhi Khan" disabled="disabled"
                                          className="profileSettigs__placeholder"

                                    />
                                    <p style={{ color: 'gray', fontSize: '12px', marginTop: '15px' }}>You are using the same name on Instagram and Facebook. Go to <br /> Facebook to change your name. <span style={{ color: 'rgb(0, 149, 246)' }}> Change Name</span></p>
                                </div>
                            </div>


                        </div>
                        <div className="profileSettings__form">
                            <div className="profileSettings__group">
                                <div>
                                    <p style={{ fontWeight: '500', marginLeft: '-31px' }}>Username</p>
                                </div>

                                <div className="profileSettings__input">
                                    <input type="text" placeholder="khan.abhi"
                                                className="profileSettigs__placeholder"
                                    />
                                    <p style={{ color: 'gray', fontSize: '12px', marginTop: '15px' }}>In most cases, you'll be able to change your username back to khan.abhi for another 14 days<span style={{ color: 'rgb(0, 149, 246)' }}>Learn More</span></p>
                                </div>
                            </div>


                        </div>
                        <div className="profileSettings__form">
                            <div className="profileSettings__group">
                                <div>
                                    <p style={{ fontWeight: '500', marginLeft: '-21px' }}>Website</p>
                                </div>

                                <div className="profileSettings__input">
                                    <input type="text" placeholder="Website"
                                          className="profileSettigs__placeholder"

                                    />

                                </div>
                            </div>


                        </div>
                        <div className="profileSettings__form">
                            <div className="profileSettings__group">
                                <div>
                                    <p style={{ fontWeight: '500', marginLeft: '15px' }}>Bio</p>
                                </div>

                                <div className="profileSettings__input">
                                    <textarea style={{ width: '370px' }}>Software Engineer at BJIT
                                        Bangladeshi
                                        Muslim</textarea>

                                </div>
                            </div>


                        </div>

                        <div className="profileSettings__form">
                            <div className="profileSettings__group">
                                <div>
                                    <p style={{ fontWeight: '500' }}>Email</p>
                                </div>

                                <div className="profileSettings__input">
                                    <input type="text" placeholder="abhikhan96@gmail.com"
                                          className="profileSettigs__placeholder"
                                    />

                                </div>
                            </div>


                        </div>
                        <div className="profileSettings__form">
                            <div className="profileSettings__group">
                                <div>
                                    <p style={{ fontWeight: '500', marginLeft: '-22px' }}>Phone Number</p>
                                </div>

                                <div className="profileSettings__input">
                                    <input type="text" placeholder="+880 1834-349695"   className="profileSettigs__placeholder"

                                    />

                                </div>
                            </div>


                        </div>

                        <div className="profileSettings__form">
                            <div className="profileSettings__group">
                                <div>
                                    <p style={{ fontWeight: '500', marginLeft: '-74px' }}>Similar Account Suggestions</p>
                                </div>

                                <div className="profileSettings__input checkbox">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" className="bike" value="Bike" />
                                    <label for="vehicle1" className="label">Include your account when recommending similar accounts people might want to follow. <span style={{ color: 'rgb(0, 149, 246)' }}>[?]
                                    </span></label><br />



                                </div>
                            </div>


                        </div>
                        <div className="profileSettings__container buttonGroup">
                            <Button className="profileSettings__submit">Submit</Button>

                            <p style={{ color: 'rgb(0, 149, 246)', fontWeight: '500', fontSize: '14px' }}>Temporarily disable my account</p>
                        </div>
                        
                    </div>




                </div>
            </div>

            <Footer />

        </>


    );
};

export default ProfileSettings;