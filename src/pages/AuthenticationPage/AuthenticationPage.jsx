import { Route, Routes } from "react-router-dom";
import SignUp from "../../Components/SignUp/SignUp";
import './AuthenticationPage.css'
import Login from "../../Components/Login/Login";
export default function AuthenticationPage() { 
    return (
        <Routes> 
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}