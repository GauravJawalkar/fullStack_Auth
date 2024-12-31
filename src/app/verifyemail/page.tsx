"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


function VerifyEmail() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log("Error verifying user email", error.response.data)
        }
    }

    // extract the token used to verify email from the window search
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className='min-h-screen flex flex-col gap-6 items-center justify-center'>
            <h1>  Verify Your Email Here</h1>

            <h2 className='ring-1 ring-neutral-600 px-5 py-2'>{token ? `${token}` : "No Token"}</h2>

            {
                verified && (
                    <div className=''>
                        <h2>Email Verified</h2>
                        <Link href={'/login'}>Login</Link>
                    </div>
                )
            }

            {
                error && (
                    <div className=''>
                        <h2>Error</h2>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail