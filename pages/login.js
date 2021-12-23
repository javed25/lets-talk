import Head from 'next/head';
import React from 'react'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import {auth, provider} from "../Firebase.js";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
                <link rel="icon" type="image/png" href="https://img.icons8.com/color/100/000000/chat--v1.png" />
            </Head>

            <LoginContainer>
            <Logo src="https://img.icons8.com/color/48/000000/chat--v3.gif"/>
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>

            </LoginContainer>
            
        </Container>
    )
}

export default Login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -5px rgba(0,0,0,0.7);
`;

const Logo = styled.img`
    margin-bottom: 50px;
`;
