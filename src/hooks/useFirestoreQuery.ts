import { useDispatch } from "react-redux";
import { useReduxSelector } from "./useReduxSelector";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { collection, doc, DocumentSnapshot, getDocs, onSnapshot, query, QueryConstraint } from "firebase/firestore";
import { db } from "../firebase";
import { endLoading, startLoading } from "../features/loadingSlice";

interface ConfigType {
    collectionName: string;
    conditions: QueryConstraint[];
    onDataReceived: (docs: DocumentSnapshot[]) => void;
    onError: (error: Error) => void;
    dependencies: string[];
}

export default function useFirestoreQuery(config: ConfigType){
    const user = useReduxSelector(state => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!user.uid) return;

        let didUnsubscribe = false;
        let unsubscribe = () => {};
        
        const executeQuery = async () => {
            try {
                dispatch(startLoading());
                const q = query(
                    collection(doc(db, 'users', user.uid), config.collectionName),
                    ...(config.conditions || [])
                );
                const initialSnapshot = await getDocs(q);
                if (!didUnsubscribe){
                    config.onDataReceived(initialSnapshot.docs);
                };
                unsubscribe = onSnapshot(q, snapshot => {
                    if (!didUnsubscribe){
                        config.onDataReceived(snapshot.docs);
                    };
                });
            } catch (err){
                config.onError(err as Error);
            } finally {
                if(!didUnsubscribe){
                    dispatch(endLoading());
                };
            };
        };

        executeQuery();

        return () => {
            didUnsubscribe = true;
            unsubscribe();
            dispatch(endLoading());
        }
    }, [user, dispatch, ...(config.dependencies || [])]);
}

// Configuration object structure:
// {
//     collectionName: 'your_collection',  // Required
//     queryConditions: (user) => [],      // Function returns query conditions
//     onDataReceived: (docs) => {},       // Required data handler
//     onError: (error) => {},             // Optional error handler
//     dependencies: []                    // Optional extra dependencies
// }