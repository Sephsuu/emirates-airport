"use client"

import { AuthService } from "@/service/authService";

export default function Login() {
    async function handleClick() {
        try {
            window.location.href = 'http://localhost:3001/auth/oauth/google';
        } catch (error) { console.log(error) }
    }
    return(
        <div>
            <p>Login to access your account</p>
            <button onClick={() => handleClick() }>Login with Google</button>
        </div>
    );
}