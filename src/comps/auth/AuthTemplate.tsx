import { useNavigate, useParams } from "react-router-dom"
import SignUp from "./SignUp";
import Login from "./Login";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AuthTemplate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authType } = useParams();

    const handleGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = userCredential.user;
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()){
                const userData = userDocSnapshot.data();
                dispatch(setUser({
                    uid: userData.uid,
                    displayName: userData.displayName,
                    email: userData.email,
                    photoURL: userData.photoURL,
                }));
            } else{
                await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                });

                dispatch(setUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }));
            }
            navigate('/');
        } catch(err) {
            console.log(err);
        };
    };

    return(
        <>
            <div className="fixed top-0 left-0 w-full h-screen bg-[#111] z-[-2]"></div>
            <nav className="fixed top-0 left-0 w-full p-2 px-5 flex items-center justify-between bg-[#1a1a1a] text-gray-300">
                <h3 
                    className="font-bold text-2xl cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    FT
                </h3>
                <a 
                    onClick={() => navigate(`${authType === 'sign-up' ? '/login' : '/sign-up'}`)}
                    className="relative group cursor-pointer"
                >
                    {authType === 'sign-up' ? 'Login' : 'Sign up'}
                    <div className="w-0 h-0.5 place-self-center group-hover:w-full bg-white absolute left-1/2 transform -translate-x-1/2 transition-all duration-300"></div>
                </a>
            </nav>
            <div 
                className="flex flex-col gap-4 m-4 mt-18 p-4 pt-2 border-1 border-[#4a4a4a] text-gray-300 rounded-lg"
            >
                {authType === 'sign-up' ? <SignUp /> : <Login />}
                <div className="flex items-center gap-2">
                    <div className="h-[1px] w-full bg-gray-400"></div>
                    <p className="text-sm text-nowrap">Login with</p>
                    <div className="h-[1px] w-full bg-gray-400"></div>
                </div>
                <button 
                    type="button"
                    className="flex items-center justify-center border-1 border-[#4a4a4a] p-2 rounded-xl gap-1 cursor-pointer hover:bg-[#222] transition-colors duration-300"
                    onClick={() => handleGoogle()}
                >
                    <div className="">
                        <img 
                            src="https://assets.tokopedia.net/asts/oauth/static-asset-icon/google.svg" 
                            className="w-full h-auto"
                        ></img>
                    </div>
                    <p className="font-bold">Google</p>
                </button>
            </div>
        </>
    )
}