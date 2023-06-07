import {LoginButton, LogoutButton} from "@/app/components/LogButtons";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {getServerSession} from "next-auth";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    return (
        <div className={'w-full h-full border border-black'}>
            {!session && <LoginButton /> }
            {session && <LogoutButton /> }
        </div>
    )
}