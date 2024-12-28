import { useState } from "react"
import { animated, useTransition } from "@react-spring/web"
import { Link } from "react-router-dom";

function Navbar(){
    const [isNavOpen, setIsNavOpen] = useState(false)

    const navTransition = useTransition(isNavOpen, {
        from: { transform: "translateX(-100%)" },
        enter: { transform: "translateX(0%)" },
        leave: { transform: "translateX(-100%)" },
        config: { tension: 200, friction: 25 },
    })

    const overlayTransition = useTransition(isNavOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { tension: 120, friction: 25 },
    });
    
    return (
        <>
            <button className="fixed top-2 left-5"
                onClick={() => setIsNavOpen(true)}>
                    <i className="fa-solid fa-bars text-xl"></i>
            </button>

            {overlayTransition(
                (styles, item) =>
                    item && (
                        <animated.div className="fixed top-0 left-0 h-full w-full bg-gray-500 z-10"
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', pointerEvents: isNavOpen ? "auto" : "none", ...styles}}
                        onClick={() => setIsNavOpen(false)}></animated.div>
                    )
            )}

            {navTransition(
                (styles, item) =>
                    item && (
                        <animated.nav
                        className="fixed p-2 px-5 pr-32 bg-white h-full z-50"
                        style={styles}
                        onClick={e => e.stopPropagation()}>
                        <button onClick={() => setIsNavOpen(false)}>
                            <i className="fa-solid fa-bars text-xl"></i>
                        </button>
                        <ul>
                            <Link to='/Expense-Tracker/'>
                                <li className="pointer mt-4">Homepage</li>
                            </Link>
                            <Link to='/Expense-Tracker/dashboard'>
                                <li className="pointer mt-4">Dashboard</li>
                            </Link>
                            <Link to='/Expense-Tracker/transactions'>
                                <li className="pointer mt-4">Transactions</li>
                            </Link>
                        </ul>
                        </animated.nav>
                    )
            )}
        </>
        
    )
}

export default Navbar