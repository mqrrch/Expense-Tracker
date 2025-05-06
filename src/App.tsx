import { Route, Routes } from "react-router-dom";
import './App.css'
import MainLayout from "./comps/MainLayout";
import DashboardPage from "./comps/dashboard/DashboardPage";
import AuthTemplate from "./comps/auth/AuthTemplate";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { setUser, clearUser } from "./features/userSlice";
import TransactionsPage from "./comps/transactions/TransactionsPage";
import { AppDispatch } from "./store";
import { useReduxSelector } from "./hooks/useReduxSelector";
import { clearTransactions } from "./features/transactionsSlice";
import { endLoading } from "./features/loadingSlice";
import { doc, getDoc } from "firebase/firestore";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useReduxSelector(state => state.loading.loadingCounter);

  // Listen for changes in user auth
  useEffect(() => {
    // Register auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Update state with user or null if logged out
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if(userDocSnapshot.exists()){
          const userData = userDocSnapshot.data();
          dispatch(setUser({
            uid: userData.uid,
            displayName: userData.displayName,
            email: userData.email,
            photoURL: userData.photoURL,
          }));
        }
      } else{
        dispatch(clearUser());
        dispatch(clearTransactions());
      };
      dispatch(endLoading());
    });
    // Cleanup (remove the listener when component unmounts)
    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <div className={`fixed flex justify-center items-center w-full h-screen top-0 left-0 bg-black z-[200] ${isLoading ? 'visible' : 'hidden'}`}>
        <div className="loader"></div>
      </div>
      <Routes>
        <Route path="/:authType" element={<AuthTemplate />}></Route>

        <Route path='/' element={<MainLayout />}>
          <Route index element={<DashboardPage />}></Route>
          <Route path='/transactions' element={<TransactionsPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}
