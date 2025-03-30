import { useState, useEffect } from "react";
import Menu from "./Menu";

export default function Navbar(){
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
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

    return (
        <nav className={`fixed flex z-10 w-full transition-colors duration-300 ${isScrolled && 'bg-[#000]'}`}>
            <Menu />
        </nav>
    )
}