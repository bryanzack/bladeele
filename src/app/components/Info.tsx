'use client';
import BurgerMenu from "@/app/components/BurgerMenu";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {RootState} from "@/lib/redux/store";
import isGuessCorrect from "@/lib/actions/checkGuess";
import {setDidWin, setMainHovered, setTrackList} from "@/lib/redux/mainSlice";

export default function Info() {
    const track_list = useAppSelector((state: RootState) => state.main.track_list);
    const did_win = useAppSelector((state: RootState) => state.main.did_win);

    const dispatch = useAppDispatch();
    const handleGuess = async (guess: string) => {
        if (await isGuessCorrect(guess)) {
            console.log('CORRECT');
            dispatch(setDidWin(true));
            dispatch(setMainHovered(false));
            dispatch(setTrackList([guess]));
        } else {
            console.log('INCORRECT');
            dispatch(setTrackList(track_list.filter(item => item !== guess)));
        }
    }
    return (
        <div className={'top-[100px] left-[100px] fixed z-50 flex flex-col pointer-events-none'}>
            <div className={'flex flex-col items-center justify-center w-[250px]'}>
                <span className={'text-[35px] text-white font-montserrat selection:text-black selection:bg-white'}>BLADEELE</span>
                <div className={'w-full h-fit flex flex-row items-center justify-around px-5'}>
                    <BurgerMenu />
                    <Link href={'https://twitter.com/b__zy'}>
                        <span className={'pointer-events-auto text-white font-montserrat selection:text-black selection:bg-white'}>B_ZY</span>
                    </Link>
                </div>
                <div className={'w-full h-[700px] mt-[25px] flex flex-col items-center justify-start'}>
                    {track_list.map((track, i) => (
                        <span key={i} onClick={() => handleGuess(track)}
                              className={'text-white truncate hover:border-opacity-50 hover:border-b-white hover:border-b-[1px] border-b-transparent border-b-[1px] cursor-pointer pointer-events-auto'}>
                            {track}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}