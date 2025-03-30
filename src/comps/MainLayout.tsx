import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import useFirestoreQuery from "../hooks/useFirestoreQuery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setExpenses } from "../features/expensesSlice";

export default function MainLayout(){
    const dispatch = useDispatch<AppDispatch>();

    useFirestoreQuery({
        collectionName: 'expenses',
        onDataReceived: (docs) => {
            const expenseItems = docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            dispatch(setExpenses(expenseItems));
        },
        onError: (error) => {
            console.log(error)
        },
        dependencies: []
    })

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-screen bg-[#111] z-[-2]"></div>
                <Navbar />
            <div className="p-4 pt-12 overflow-hidden">
                <Outlet />
            </div>
        </>
    )
}