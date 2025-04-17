import { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import { useReduxSelector } from "../hooks/useReduxSelector";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import SettingsPage from "./settings/SettingsPage";

export default function Navbar(){
    const user = useReduxSelector(state => state.user);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 50){
                setIsScrolled(true);
            } else{
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            if (
                imageRef.current && 
                !imageRef.current.contains(e.target as Node) &&
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                setIsModalOpen(false);
            };
        };

        const listener = (e: globalThis.MouseEvent) => handleClickOutsideDropdown(e);

        if (isModalOpen){
            document.addEventListener('mousedown', listener);
        } 
        
        return () => document.removeEventListener('mousedown', listener);
    }, [isModalOpen]);

    const handleGoToAuth = async() => {
        try{
            await signOut(auth);
            navigate('/sign-up');
            setIsModalOpen(false);
        } catch (err){
            console.log(err);
        };
    };

    return (
        <nav className={`fixed flex items-center justify-between z-10 w-full transition-colors duration-300 ${isScrolled && 'bg-[#0a0a0a]'}`}>
            <Menu />
            {user.uid ? (
                <div className="relative w-9 mr-5">
                    <img 
                        src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg" 
                        className="rounded-full w-full h-auto cursor-pointer"
                        ref={imageRef}
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    ></img>
                    {isModalOpen && (
                        <div 
                            ref={modalRef}
                            className="absolute flex flex-col gap-2 p-3 rounded top-11 right-1 text-gray-300 bg-[#2b2b2b]"
                        >
                            <a onClick={() => setIsSettingsOpen(true)} className="cursor-pointer">Settings</a>
                            <a onClick={handleGoToAuth} className="cursor-pointer">Logout</a>
                        </div>
                    )}
                    {isSettingsOpen && (
                        <SettingsPage setIsSettingsOpen={setIsSettingsOpen} />
                    )}
                </div>
            ) : (
                <div 
                    className="mr-5 p-1 px-3 text-gray-300 rounded-lg transition-colors duration-300 hover:bg-[rgba(0,201,81,0.6)] border-1 border-green-400 cursor-pointer"
                    onClick={() => navigate('/sign-up')}
                >
                    <p>Sign up</p>
                </div>
            )}
        </nav>
    )
}