import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            dispatch(setUser({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
            }));
            navigate('/');
        } catch(err){
            console.log(err);
        }
    }

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <h2 className="text-[20px] text-center">Sign Up</h2>
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
                Sign Up
            </button>
        </form>
    )
}