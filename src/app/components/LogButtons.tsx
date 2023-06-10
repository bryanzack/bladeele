'use client';
import {signIn, signOut} from "next-auth/react";

export const LoginButton = () =>
    <button onClick={() => signIn('twitter')}
            className={'text-white font-montserrat text-3xl'}>
        Login
    </button>
