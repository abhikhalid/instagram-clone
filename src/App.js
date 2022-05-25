import React, { useEffect, useState } from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from "./Header";
import Posts from "./Posts";
import Widgets from "./Widgets";
import Messages from "./Messages";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import ProfileSettings from "./ProfileSettings";
import ProfilePostDetail from "./ProfilePostDetail";
import ViewStory from "./ViewStory";
import Login from "./Login";

import { useStateValue } from './StateProvider';
import Stories from "./Stories";
import Message from "./Message";
import Flash from "./Flash";



function App() {

  const [{ user }, dispatch] = useStateValue();

  const [flash, setFlash] = useState(true);


  useEffect(() => {

    const myTimeout = setTimeout(() => {
      setFlash(false);
    }, 2000);

    return () => {
      clearTimeout(myTimeout);
    };
  }, [])



  return (
    //BEM
    <div className="app">

      {
        flash && <Flash />
      }


      {
        !user ? (
          <Login />
        ) : (
          <Router>

            <Header />

            <Switch>


              <Route path="/flash">

                <Flash />

              </Route>

              <Route path="/viewStory">

                <ViewStory />


              </Route>
              <Route path="/profilepostdetail/:postId">

                <ProfilePostDetail />


              </Route>

              <Route path="/profile">
                <Profile />

              </Route>


              <Route path="/profilesettings">

                <div>
                  <div className="app__profileSettings">
                    <ProfileSettings />

                  </div>
                </div>

              </Route>
              <Route path="/profile">
                <Profile />

              </Route>

              <Route path="/messages">
                <Messages />

              </Route>
              <Route path="/rooms/:id">
                <Message />


              </Route>
              <Route path="/">

                <div className="app__body">



                  <Posts />

                  <Widgets />



                </div>

              </Route>
            </Switch>

          </Router>
        )
      }



    </div >
  );
}

export default App;
