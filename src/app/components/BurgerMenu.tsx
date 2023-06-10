'use client';
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {toggleMenuState} from "@/lib/redux/mainSlice";
import {RootState} from "@/lib/redux/store";

export default function BurgerMenu() {
    const dispatch = useAppDispatch();
    const menu_state = useAppSelector((state: RootState) => state.main.menu_state);
    return (
        <button className="relative group pointer-events-auto" onClick={() => dispatch(toggleMenuState())}>
            <div
                className="relative flex overflow-hidden items-center justify-center w-[100px] h-[10px] transform transition-all bg-transparent duration-200 shadow-md">
                <div
                    className="flex flex-col justify-between w-[100px] h-[10px] transform transition-all duration-100 origin-center overflow-hidden">
                    <div
                        className={`bg-white h-[1px] w-[90px] transform transition-all duration-100 origin-left ${menu_state ? 'rotate-[5.6deg]' : ''} opacity-50`}></div>
                    <div
                        className={`bg-white h-[1px] w-[90px] transform transition-all duration-100 opacity-50 ${menu_state ? 'opacity-0' : ''} `}></div>
                    <div
                        className={`bg-white h-[1px] w-[90px] transform transition-all duration-100 origin-left ${menu_state ? '-rotate-[5.6deg]' : ''} opacity-50`}></div>
                </div>
            </div>
        </button>
    );
}