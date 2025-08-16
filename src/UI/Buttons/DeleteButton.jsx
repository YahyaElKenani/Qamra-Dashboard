export default function DeleteButton({label, fn}) { 
    return ( 
        <button
        className="bg-red-500 text-gray-50 self-center p-3.5 w-fit rounded-lg cursor-pointer hover:bg-red-600
        transition-all duration-500 font-medium" onClick={fn}>{label}</button>
    )
}