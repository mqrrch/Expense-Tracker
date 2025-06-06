import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../features/userSlice";
import { doc, getDoc } from "firebase/firestore";

export default function Login(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
                navigate('/');
            }
        } catch(err){
            console.log(err);
        }
    }

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <h2 className="text-[20px] text-center">Login</h2>
            <input
                className="p-1 pl-2 border-1 border-[#222] rounded-lg outline-none"   
                type="email"
                name="sign-up-email"
                id="sign-up-email"
                placeholder="Email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                required
            ></input>
            <div className="relative flex items-center border-1 border-[#222] rounded-lg">
                <input
                    className="p-1 pl-2 outline-none flex-1"   
                    type={hidePassword ? 'password' : ''}
                    name="sign-up-password"
                    id="sign-up-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    required
                ></input>
                <i className={`fa-solid ${hidePassword ? 'fa-eye' : 'fa-eye-slash'} mx-2 text-gray-500 cursor-pointer select-none`} onClick={() => setHidePassword(!hidePassword)}></i>
            </div>
            <button 
                className="cursor-pointer p-1.5 border-1 border-[#4a4a4a] rounded-xl hover:bg-[#222] transition-colors duration-300"
                type="submit"
            >
                Login
            </button>
        </form>
    )
}