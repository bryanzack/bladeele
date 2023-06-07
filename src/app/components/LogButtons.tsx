'use client';
import {signIn, signOut} from "next-auth/react";

export const LoginButton = () =>
    <button onClick={() => signIn('twitter')}
            className={'w-[300px] h-[100px] border border-black'}>
        Login
    </button>

export const LogoutButton = () =>
    <button onClick={() => signOut()}
            className={'w-[300px] h-[100px] border border-black'}>
        Logout
    </button>
