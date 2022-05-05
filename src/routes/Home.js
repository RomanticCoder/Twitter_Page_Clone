import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory"

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        // Create a reference to the nweets collection
        const nweetsRef =  collection(dbService, "nweets")
        // create a query against the collection
        const q = query(
            nweetsRef,
            orderBy("createdAt", "desc")
        );

        onSnapshot(q, (snapshot) => {
            console.log(snapshot)
            console.log(snapshot.docs)
            const nweetArr = snapshot.docs.map((doc) =>{ 
                return({
                id: doc.id,
                ...doc.data(),
            })
        });

            setNweets(nweetArr);
        });
    }, []);

    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;