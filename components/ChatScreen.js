import { Avatar, Container } from '@material-ui/core'
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth, db } from '../Firebase';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import { useCollection } from 'react-firebase-hooks/firestore';
import { InsertEmoticon } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import Message from './Message.js';
import firebase from 'firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from "timeago-react";
// import Input from '@mui/material/Input';

function ChatScreen({ chat, messages }) {

    // console.log(messages)

    const [user] = useAuthState(auth);
    const [input,setInput] = useState("")
    const endOfMessagesRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc"))
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email","==",getRecipientEmail(chat.users,user))
    )

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message = {{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        } else{
            return JSON.parse(messages).map((message) => (
                <Message key={message.id} user={message.user} message={message} />
            ));
        }
    };


    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start",
        })
    }

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {merge:true}
        )

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL,
        })

        setInput("")
        scrollToBottom()
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(chat.users,user)

    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}

                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last Seen: {" "}
                        {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ): "Hidden"}
                        </p>
                    ): (
                        <p>Loading Last Seen...</p>
                    )}
                </HeaderInformation>

                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef}/>
            </MessageContainer>

            <InputContainer>
            <IconButton>
                <InsertEmoticon />
             </IconButton>
             <Input value={input} onChange={e => setInput(e.target.value)} />
             <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
             <IconButton>
             <MicIcon />
             </IconButton>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top:0;
    display: flex;
    padding: 12px;
    height: 80px;
    align-items: center;
    border-bottom: 2px solid whitesmoke;
`;
const HeaderInformation = styled.div`
    margin-left: 15px;
    flex:1;

    >h3{
        margin-bottom: 3px;
    }
    >p{
        font-size: 14px;
        color: grey;
    }
`;
const HeaderIcons = styled.div``;
const EndOfMessage = styled.div`
    margin-bottom:50px;
`;
const MessageContainer = styled.div`
    padding:30px;
    background-color: #e5ded8;
    min-height:78vh;
`;
const Input = styled.input`
    flex:1;
    align-items: center;
    padding:20px;
    position: sticky;
    bottom:0;
    background-color: whitesmoke;
    outline: 0;
    border: none;
    border-radius: 10px;
    margin-left: 15px;
    margin-right: 15px;
    
`;
const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    bottom: 0;
    background-color: white;
    z-index:100;
`;
