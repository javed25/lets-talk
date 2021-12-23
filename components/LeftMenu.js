import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import * as EmailVaildator from "email-validator"
import { auth, db } from '../Firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import Chat from './Chat';

function LeftMenu() {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where("users","array-contains",user.email)
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt("Please enter an Email of the person you want to chat with");
        if (!input) return null;

        if(EmailVaildator.validate(input) && !chatExist(input) && input != user.email) {
            db.collection("chats").add({
                users:[user.email, input]
            });

        }
    }

    const chatExist = (recipient) => 
        !!chatsSnapshot?.docs.find((chat) => chat.data().users.find(user=> user === recipient)?.length>0)
    

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                <img src="https://img.icons8.com/color/40/000000/chat--v3.gif" height='60'/>
                <IconsContainer>
                    <IconButton>
                        <MarkUnreadChatAltIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats..." />
            </Search>

            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}

        </Container>
    )
}

export default LeftMenu;

const Container = styled.div`
    flex:0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width:300px;
    max-width:350px;
    overflow-y:scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const Search = styled.div`
    display:flex;
    align-items:center;
    padding:20px;
    border-radius:2px;
`;

const SearchInput = styled.input`
    outline-width:0;
    border:none;
    flex:1;
`;

const SidebarButton = styled(Button)`
    width:100%;

    &&&{
        border-top : 2px solid whitesmoke;
        border-bottom : 2px solid whitesmoke;
    }
`;

const Header = styled.div`
    display:flex;
    position:sticky;
    top:0;
    background-color:white;
    z-index:1;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    height:80px;
    border-bottom:2px solid whitesmoke;
    >img{
        cursor: pointer;
        :hover{
            opacity: 0.8;
        }
       
    }
`;

const UserAvatar = styled(Avatar)`
    cursor:pointer;
    :hover{
        opacity:0.8;
    };
`;

const IconsContainer = styled.div``;