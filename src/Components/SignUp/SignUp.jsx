import { MdEmail } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import {supabase} from '../../server/supabase-client'
import { v4 as uuidv4 } from "uuid";
import { showToast } from "../../UI/Toast/showToast";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
export default function SignUp() { 
    const [newAccount, setNewAccount] = useState({email: '', password: ''});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const validateData = () => { 
        if (newAccount.email === '') { 
            showToast({type: 'error', message: 'Email is required!'});
            setLoading(false);
            return false;
        } else if (newAccount.password === '') { 
            showToast({type: 'error', message: 'Password is required!'});      
            setLoading(false);
            return false;
        } else if (confirmPassword === '') { 
            showToast({type: 'error', message: 'Password confirmation is required!'});
            setLoading(false);
            return false;
        } else if (confirmPassword !== newAccount.password) { 
            showToast({type: 'error', message: 'Error confirming password! please check again'});
            setLoading(false);
            return false;
        }
        return true;
    }


    const signUp = async (id) => { 
        const {error} = await supabase.auth.signUp({ 
            email: newAccount.email, 
            password: newAccount.password, 
            options: { 
                data: { 
                    user_id: id 
                }
            }
        })
        if (error) { 
                showToast({type: 'error', message: 'Something went wrong, try again later'});
        return;
        } else { 
            showToast({type: 'success', message: 'Account created successfully! please check your email'})
            setLoading(false)
        }
        const {secError} = await supabase.from("profiles").insert({
            id: id, 
            email: newAccount.email, 
            password: newAccount.password,
            is_admin: false
        })
        if (secError) { 
            console.log(`error inserting new account into table ${secError.message}`);
            return;
        } else { 
            console.log(`account inserted successfully`);
            navigate('/login')
            setLoading(false);
        }
    }


    const handleSubmit = (e) => { 
        e.preventDefault();
        setLoading(true);
        if (validateData() === true) { 
            const newId = uuidv4();
            signUp(newId);
        }
    }

    const togglePassword = () => { 
        setShowPassword((prevState) => !prevState)
    }

    const toggleConfirmPassword = () => { 
        setShowConfirmPassword((prevState) => !prevState)
    }

    return ( 
        <div className="authentication-container w-full flex justify-center items-center">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
                transition={Bounce}
                />
            <form className="flex flex-col text-center gap-2 w-70 md:w-90" onSubmit={handleSubmit}>
                <div className="text-2xl md:text-4xl font-bold mb-2">Sign Up</div>
                <div className="flex items-center gap-4">
                    <MdEmail className="text-2xl"/>
                    <input type="email" placeholder="Enter Your Email" className="w-full border border-neutral-500 p-3 rounded-lg"
                    onChange={(e) => setNewAccount((prevState) => ({...prevState, email: e.target.value}))}
                    />
                </div>
                <div className="flex items-center gap-4">
                    { 
                        showPassword ? 
                        <FaRegEyeSlash className="text-2xl" onClick={togglePassword}/>
                        :   
                        <FaRegEye className="text-2xl" onClick={togglePassword}/>
                    }
                    <input type={`${showPassword ? 'text' : 'password'}`} placeholder="Create Password" className="w-full border border-neutral-500 p-3 rounded-lg"
                    onChange={(e) => setNewAccount((prevState) => ({...prevState, password: e.target.value}))}
                    />
                </div>
                <div className="flex items-center gap-4">
                    { 
                        showConfirmPassword ? 
                        <FaRegEyeSlash className="text-2xl" onClick={toggleConfirmPassword}/>
                        :   
                        <FaRegEye className="text-2xl" onClick={toggleConfirmPassword}/>
                    }
                    <input type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder="Confirm Password"
                    className="w-full border border-neutral-500 p-3 rounded-lg" 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                { 
                    loading ? 
                    <ConfirmButton label={'Creating an account...'} />
                    : 
                    <ConfirmButton label={'Sign Up'} />
                }
                <p className="text-sm text-blue-600 cursor-pointer hover:text-blue-900 transition-all duration-200"
                onClick={() => navigate('login')}
                >Already have an account?</p>
            </form>
        </div>
    )
}