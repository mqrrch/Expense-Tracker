interface Props{
    setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsPage({ setIsSettingsOpen }: Props){
    return (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#111] overflow-hidden z-100">
            <p onClick={() => setIsSettingsOpen(false)}>close</p>
        </div>
    )
}