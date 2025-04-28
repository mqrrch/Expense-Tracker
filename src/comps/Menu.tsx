import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useReduxSelector } from "../hooks/useReduxSelector";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Menu(){
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const user = useReduxSelector((state) => state.user);

    interface MenuContent {
        name: string;
        link: string;
    }

    const menuContent: MenuContent[] = [
        { name: 'Dashboard', link: '/' },
        { name: 'Transactions', link: '/transactions' },
    ]

    const changePage = (link: string) => {
        navigate(link);
        setIsMenuOpen(false);
    }

    const handleGoToAuth = async() => {
        if (user.uid) {
            try{
                await signOut(auth);
                navigate('/sign-up');
                setIsMenuOpen(false);
            } catch (err){
                console.log(err);
            }
        } else{
            navigate('/sign-up');
        };
    }

    return (
        <>
            <button 
                className={`menu-btn m-5 cursor-pointer z-60 outline-none ${isMenuOpen ? "open" : ""}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                    <div className="menu-btn-line"></div>
                    <div className="menu-btn-line"></div>
                    <div className="menu-btn-line"></div>
            </button>
            <div 
                id="menu-overlay" 
                onClick={() => setIsMenuOpen(false)} 
                className={`fixed top-0 left-0 h-screen w-full bg-black transition-opacity duration-500 z-30 ${isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
            ></div>
            <div 
                id="menu" 
                onClick={e => e.stopPropagation()}
                className={`fixed top-0 left-0 h-full flex flex-col z-[40] bg-[#191919] w-[80%] max-w-[200px] md:max-w-[220px] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <ul id="menu-content" className={`flex flex-col items-start gap-3 ml-5 mt-16 text-[#e6e6e6]`}>
                    {menuContent.map((content, index) => (
                        <li 
                            key={index}
                            className="relative group cursor-pointer"
                            onClick={() => changePage(content.link)}
                        >
                            {content.name}
                            <div className="w-0 h-0.5 place-self-center group-hover:w-full bg-white absolute transition-all duration-300"></div>
                        </li>
                    ))}
                </ul>
                <button 
                    type="button"
                    className={`mt-auto m-5 p-1.5 border-1 ${user.uid ? 'hover:bg-[rgba(245,110,117,0.6)] border-red-400' : 'hover:bg-[rgba(0,201,81,0.6)] border-green-400'} transition-colors duration-300 text-gray-300 rounded  cursor-pointer`}
                    onClick={handleGoToAuth}
                >
                    {user.uid ? 'Logout' : 'Sign up'}
                </button>
            </div>
        </>
    )
}