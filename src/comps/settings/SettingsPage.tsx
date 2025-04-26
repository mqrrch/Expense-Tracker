import { useEffect } from "react";
import Photo from "./Photo";

interface Props{
    isSettingsOpen: boolean;
    setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsPage({ isSettingsOpen, setIsSettingsOpen }: Props){
    useEffect(() => {
        if (isSettingsOpen){
            document.body.classList.add('overflow-hidden');
        } else{
            document.body.classList.remove('overflow-hidden');
        };

        return () => document.body.classList.remove('overflow-hidden');
    }, [isSettingsOpen]);

    return (
        <div className="fixed w-full h-screen p-10 top-0 left-0 bg-[#111] z-100">
            <i 
                className="fa-solid fa-xmark-circle text-gray-300 text-2xl absolute top-5 right-5 cursor-pointer"
                onClick={() => setIsSettingsOpen(false)}
            ></i>
            <Photo />
        </div>
    )
}