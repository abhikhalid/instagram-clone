import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';

import './Login.css';

import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

import { auth, db, provider } from './firebase';

import { useHistory } from "react-router-dom";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [{ user }, dispatch] = useStateValue();

    let history = useHistory();



    const [backgroundImage, setBackgroundImage] = useState(["https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png", "https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png", "https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png", "	https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png"]);



    const [i, setI] = useState(0);

    useEffect(() => {


        const imageChangerHandler = () => {
            // setBackgroundImage(backgroundImage[i]);

            if (i > 2) {
                setI(0);
            }


            setI((prevI) => {
                setI(prevI + 1);
            })


        }

        const abc = setInterval(imageChangerHandler, 4000);

        // console.log(i);


        return () => {
            clearInterval(abc);
        }

    }, [i])


    useEffect(() => {

        if (user != null) {
            history.push("/");
        }


    }, [user])



    const signIn = (e) => {

        e.preventDefault();

        auth
            .signInWithPopup(provider)
            .then((result) => {

                // console.log(result);

                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })

                localStorage.setItem("user", "1");


                history.push("/");
            })
        // .catch((error) => alert(error.message));



    }


    const signInWithEmailAndPassword = (event) => {

        event.preventDefault();


        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                // console.log(result.user);


                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })

                localStorage.setItem("user", "1");

                history.push("/");


            })
            .catch((error) => alert(error.message));



    }

    const signUp = (event) => {

        event.preventDefault();


        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {

                // console.log(authUser);


                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));



    }


    return (
        <>
            <div className='login'>

                <div className="login__left">

                    <div className="login__leftImageChanger" style={{ backgroundImage: `url(${backgroundImage[i]})` }} >

                    </div>


                </div>

                <div className="login__right">
                    <form className="login__inputContainer">

                        <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="instagram logo" className='login__logo' />

                        <div className="login__phoneNumberContainer">
                            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="login__phoneNumberContainer">
                            <input type="text" placeholder="Email Address...." value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="login__passwordContainer">
                            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                        </div>



                        <Button type="submit" onClick={signInWithEmailAndPassword}>Log In</Button>



                        <p style={{ color: 'gray', textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>OR</p>


                        <div className="login__loginWithGoogle">
                            <p style={{ color: 'gray', textAlign: 'center', marginTop: '10px', marginBottom: '10px' }} onClick={signIn}> Log in with Google.</p>
                        </div>

                        <p style={{ fontSize: '10px', marginLeft: 'auto', marginRight: 'auto', color: 'gray' }}>Forgot password?</p>



                    </form>

                    <div className="login__donthaveAccountContainer">

                        <p>Don't have an account? <span className="signUp" onClick={signUp}>Sign up</span></p>

                    </div>



                    <div className="loginImageButtonContainer">

                        <img src="	https://www.instagram.com/static/images/appstore-i…-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="" />

                        <img src="https://www.instagram.com/static/images/appstore-i…ges/badge_android_english-en.png/e9cd846dc748.png" alt="" />


                    </div>


                </div>



            </div>
            <Footer />
        </>
    );
};

export default Login;