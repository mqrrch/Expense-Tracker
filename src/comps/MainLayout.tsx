import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setTransactions } from "../features/transactionsSlice";
import { orderBy } from "firebase/firestore";

export default function MainLayout(){
    const dispatch = useDispatch<AppDispatch>();

    useFirestoreQuery({
        collectionName: 'transactions',
        conditions: [orderBy('date', 'asc')],
        onDataReceived: (docs) => {
            const transactionItems = docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            dispatch(setTransactions(transactionItems));
        },
        onError: (error) => {
            console.error(error)
        },
        dependencies: []
    })

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-screen bg-[#111] z-[-2]"></div>
            <Navbar />
            <div className="p-4 pt-14 overflow-hidden">
                <Outlet />
            </div>
        </>
    )
}