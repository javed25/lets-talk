import Head from 'next/head';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components"
import ChatScreen from '../../components/ChatScreen';
import LeftMenu from '../../components/LeftMenu';
import { auth, db } from '../../Firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';


function Chat({chat, messages}) {
    const [user] = useAuthState(auth);

    return (
        <Container>
            <Head>
                <title>Chatting</title>
                <link rel="icon" type="image/png" href="https://img.icons8.com/color/100/000000/chat--v1.png" />
            </Head>
            <LeftMenu />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
            
        </Container>
    )
}

export default Chat;

export async function getServerSideProps(context){
   
    const ref = db.collection("chats").doc(context.query.id);

    const messagesRes = await ref.collection("messages").orderBy("timestamp","asc").get();
    const messages = messagesRes.docs.map((doc) =>({
        id:doc.id,
        ...doc.data(),
    })).map((messages) => ({
        ...messages,
        timestamp:messages.timestamp.toDate().getTime(),
    }));
    console.log(messages);

    const chatRes = await ref.get();
    const chat = {
        id:chatRes.id,
        ...chatRes.data(),
    };

    return {
        props:{
            messages:JSON.stringify(messages),
            chat:chat,
        },
    };
    
}


const Container = styled.div`
    display:flex;
`;
const ChatContainer = styled.div`
    flex:1;
    overflow: scroll;
    height: 100vh;
    ::-webkit-scrollbar {
        display: none;

    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    
`;
