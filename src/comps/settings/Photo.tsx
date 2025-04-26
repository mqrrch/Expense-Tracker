import { useReduxSelector } from "../../hooks/useReduxSelector"

export default function Photo(){
    const user = useReduxSelector(state => state.user);

    const uploadPhotoToImgur = async (file) => {
        
    }

    return (
        <div className="w-20 rounded-full">
            <img src={user.photoURL} className="w-full h-auto rounded-full"></img>
        </div>
    )
}