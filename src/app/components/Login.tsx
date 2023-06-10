import {LoginButton} from "@/app/components/LogButtons";

export default function Login() {
    return (
        <div className={'w-screen h-screen bg-black flex items-center justify-center'}>
            <div className={'border-white border-2 w-[200px] h-[100px] flex items-center justify-center'}>
                <LoginButton />
            </div>
        </div>
    )
}