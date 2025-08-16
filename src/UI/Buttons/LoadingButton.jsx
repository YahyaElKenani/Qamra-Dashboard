import {ClipLoader} from 'react-spinners'
export default function LoadingButton({label}) { 
    return ( 
        <button className="bg-emerald-400 text-gray-50 self-center p-3.5 w-fit rounded-lg cursor-pointer hover:bg-emerald-500
        transition-all duration-500 font-medium flex items-center gap-3" disabled>
            <ClipLoader size={'16px'}/> 
            {label}
        </button>
    )
}