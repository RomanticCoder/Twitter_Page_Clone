import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import {
    addDoc,
    collection,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            // ref() - root reference is null 
            // ref("child/path") - root reference is last token in the path (in this case,uuidv4)
            const storageRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            
            // to upload a raw/encoded string to storage
            // uploadString(storageRef, string, format)
            await uploadString(storageRef, attachment, "data_url");
            // get downloadURL using a created reference from a storage service
            attachmentUrl = await getDownloadURL(storageRef);
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        // add a new document [ collection - document(object) - data]
        // access data like this => doc(db, 'users', 'alovelace');
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    /**
        files => FileList {0:File, length:1}
        console.log(files)

        FileReader object lets web apps asynchronously read the contents of files stored on the user's computer
        using File/Blob objects to specify the file/data to read

        file objects may be obtained from 
        1. a FileList object returned 
            as a result of a user seleting files using <input> element
        2. from a drag + drop operation's DataTransfer object
        3. form the mozGetAsFile() API on an HTMLCanvasElement

        FileReader can only access the contents of files 
        that the user has explicitly selected

        https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
     */
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setAttachment("");

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;