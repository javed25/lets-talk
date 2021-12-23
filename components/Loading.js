import React from 'react'
import {Circle} from 'better-react-spinkit';
import Head from 'next/head';

function Loading() {
    return (
        <>

        <Head>
        <title>loading...</title>
        {/* <link rel="icon" type="image/png" href="https://img.icons8.com/color/100/000000/chat--v1.png" /> */}
         </Head>


        <center style={{display:"flex",flexDirection:"column",justifyContent:"center",height:"100vh"}}>
            <div>
                <p style={{fontSize:"25px"}}>lets talk is loading... Please wait</p>
            {/* <img src="https://img.icons8.com/color/100/000000/chat--v1.png"/> */}
            <img src="https://img.icons8.com/color/48/000000/chat--v3.gif"/>
            </div>
            <Circle color="#2596be" size={70} />
            
        </center>
        </>
    )
}

export default Loading
