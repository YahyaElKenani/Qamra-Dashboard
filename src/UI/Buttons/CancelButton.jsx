export default function CancelButton({label, fn}) { 
    return ( 
        <button
        className="bg-gray-400 text-gray-50 self-center p-3.5 w-fit rounded-lg cursor-pointer hover:bg-gray-500
        transition-all duration-500 font-medium" onClick={fn}>{label}</button>
    )
}