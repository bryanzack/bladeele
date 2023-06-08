'use client';
export default function BurgerMenu() {
    return (
        <button className="relative group pointer-events-auto">
            <div
                className="relative flex overflow-hidden items-center justify-center w-[100px] h-[10px] transform transition-all bg-transparent duration-200 shadow-md">
                <div
                    className="flex flex-col justify-between w-[100px] h-[10px] transform transition-all duration-100 origin-center overflow-hidden">
                    <div
                        className="bg-white h-[1px] w-[90px] transform transition-all duration-100 origin-left group-focus:rotate-[5.6deg] opacity-50"></div>
                    <div
                        className="bg-white h-[1px] w-[90px] transform transition-all duration-100 opacity-50 group-focus:opacity-0"></div>
                    <div
                        className="bg-white h-[1px] w-[90px] transform transition-all duration-100 origin-left group-focus:-rotate-[5.6deg] opacity-50"></div>
                </div>
            </div>
        </button>
    );
}