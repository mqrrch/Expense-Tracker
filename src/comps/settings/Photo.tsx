import { useReduxSelector } from "../../hooks/useReduxSelector"

export default function Photo(){
    const user = useReduxSelector(state => state.user);

    return (
        <div className="w-20 rounded-full">
            <img src={user.photoURL} className="w-full h-auto rounded-full"></img>
        </div>
    )
}