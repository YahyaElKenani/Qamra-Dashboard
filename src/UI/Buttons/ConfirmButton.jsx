export default function ConfirmButton ({label, fn}) { 
    return ( 
        <button
        className="bg-emerald-400 text-gray-50 self-center p-3.5 w-fit rounded-lg cursor-pointer hover:bg-emerald-500
        transition-all duration-500 font-medium" onClick={fn}>{label}</button>
    )
}