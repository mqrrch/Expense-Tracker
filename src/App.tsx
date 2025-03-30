import { Route, Routes } from "react-router-dom";
import './App.css'
import MainLayout from "./comps/MainLayout";
import DashboardPage from "./comps/dashboard/DashboardPage";
import ExpensesPage from "./comps/expenses/ExpensesPage";
import AuthTemplate from "./comps/auth/AuthTemplate";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { setUser, clearUser } from "./features/userSlice";
import IncomePage from "./comps/income/IncomePage";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function App() {
  const dispatch = useDispatch();

  // Listen for changes in user auth
  useEffect(() => {
    // Register auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Update state with user or null if logged out
      if (user) {
        const serializableUser = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
        };
        
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()){
          try{
            await setDoc(userDocRef, {
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
            });
          } catch (err){
            console.error(err);
          }
        }

        dispatch(setUser(serializableUser));
      } else{
        dispatch(clearUser());
      };
    });
    // Cleanup (remove the listener when component unmounts)
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/:authType" element={<AuthTemplate />}></Route>

      <Route path='/' element={<MainLayout />}>
        <Route index element={<DashboardPage />}></Route>
        <Route path='/expenses' element={<ExpensesPage />}></Route>
        <Route path='/income' element={<IncomePage />}></Route>
      </Route>
    </Routes>
  )
}
