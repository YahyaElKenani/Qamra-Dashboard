import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { supabase } from "../../server/supabase-client";
import { showToast } from "../../UI/Toast/showToast";
import { Bounce, ToastContainer } from "react-toastify";
export default function Login() { 
    const [account, setAccount] = useState({email: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const login = async () => { 
        const {error} = await supabase.auth.signInWithPassword({ 
            email: account.email, 
            password: account.password, 
        })
        if (error) { 
            showToast('error', 'Log in failed!')
            return; 
        } else { 
            showToast('success', 'Logged in successfully!');
            navigate('/dashboard');
        }
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        login();
    }

    const togglePassword = () => { 
        setShowPassword((prevState) => !prevState); 
    }
    return ( 
        <div className="authentication-container w-full flex justify-center items-center"> 
            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
            />
            <form className="flex flex-col text-center gap-2 w-70 md:w-90" onSubmit={handleSubmit}>
                <div className="text-2xl md:text-4xl font-bold mb-2">Log in</div>
                <div className="flex items-center gap-4">
                    <MdEmail className="text-2xl"/>
                    <input type="email" placeholder="Enter Your Email" className="w-full border border-neutral-500 p-3 rounded-lg"
                    onChange={(e) => setAccount((prevState) => ({...prevState, email: e.target.value}))}
                    />
                </div>
                <div className="flex items-center gap-4">
                    { 
                        showPassword ? 
                        <FaRegEyeSlash className="text-2xl" onClick={togglePassword}/>
                        :   
                        <FaRegEye className="text-2xl" onClick={togglePassword}/>
                    }
                    <input type={`${showPassword ? 'text' : 'password'}`} placeholder="Enter Your Password" className="w-full border border-neutral-500 p-3 rounded-lg"
                    onChange={(e) => setAccount((prevState) => ({...prevState, password: e.target.value}))}
                    />
                </div>
                <ConfirmButton label={'Log in'} />
                <p className="text-sm text-blue-600 cursor-pointer hover:text-blue-900 transition-all duration-200"
                onClick={() => navigate('/')}
                >Don't have an account? Sign up here</p>
            </form>
        </div>
    )
}