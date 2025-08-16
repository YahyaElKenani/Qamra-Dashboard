import { useNavigate } from "react-router-dom";
import './UnauthorizedPage.css'
import warning from '../../assets/Images/9e9.webp'
export default function UnauthorizedPage() { 
    const navigate = useNavigate();
    return ( 
        <div className="page-container flex flex-col gap-3">
            {/* <SiAdblock className="text-5xl text-red-600"/> */}
            <img src={warning} alt="blocked" className="w-80 h-80 md:w-100 md:h-100 object-cover rounded-2xl" />
            <div className="text-xl md:text-3xl">You are not allowed to visit this site</div>
            <p className="text-blue-500 hover:opacity-75 cursor-pointer" onClick={() => navigate('/login')}>Return to log in</p>
        </div>
    )
}