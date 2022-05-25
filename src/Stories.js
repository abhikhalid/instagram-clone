import React, { useEffect, useState } from 'react';
import { db } from './firebase';

import './Stories.css';
import Story from './Story';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useStateValue } from './StateProvider';

import { storage } from './firebase';




const Stories = () => {

    const [stories, setStories] = useState([]);

    const [{ user }, dispatch] = useStateValue();

    const hiddenFileInput = React.useRef(null);

    const [image, setImage] = useState(null);

    useEffect(() => {



        db.collection('stories').onSnapshot(snapshot => (
            setStories(snapshot.docs.map(doc => {

                const timestampDate = doc.data().timestamp.toDate().toString().split(" ");

                // console.log(timestampDate);

                const date = timestampDate[2];
                const year = timestampDate[3];

                // if (date == new Date().getDate() && year == new Date().getUTCFullYear()) {
                //     return {
                //         id: doc.id,
                //         story: doc.data(),
                //     }
                // }

                return {
                    id: doc.id,
                    story: doc.data(),
                }

            })
            )))


    }, [])

    const handleChange = e => {

        if (e.target.files[0]) {
            setImage(e.target.files[0]);

        }

        setTimeout(() => {
            console.log(image?.name);
        }, 2000);


    };





    const storyUploadHandler = (event) => {

        hiddenFileInput.current.click();


    }






    return (
        <div className="stories">



            <Story src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa85IJEAk0J5Hu-Z1oADHXnxxDLouEgEetYA&usqp=CAU" addStory storyUploadHandler={storyUploadHandler} />


            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />


            {
                stories.length > 0 && (stories.map(story => <Story key={story.id} story={story.story} />))
            }




        </div>
    );
};

export default Stories;