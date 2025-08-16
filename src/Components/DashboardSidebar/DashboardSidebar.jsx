import logo from '../../assets/Images/logo.png'
import { CiLogout } from "react-icons/ci";
import './DashboardSidebar.css'
import { supabase } from '../../server/supabase-client';
import { showToast } from '../../UI/Toast/showToast';
import { Bounce, ToastContainer } from 'react-toastify';
import { MdOutlineMenu, MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useIsMobile } from '../../Hooks/useIsMobile';

export default function DashboardSidebar({active}) { 
    const navigate = useNavigate();
    const [expandNav, setExpandNav] = useState(false);
    const isMobile = useIsMobile();

    const logOut = async () => { 
        const {error} = await supabase.auth.signOut();
        if (error) { 
            return;
        } else { 
            showToast("SUCCESS", "Signed Out"); 
            navigate('/login')
        }
    }

    const sidebarContent = (
        <>
            <div> 
                <div className='flex justify-between m-5 mb-20 pe-10 h-20 full items-center'> 
                    <img src={logo} alt="logo" className='w-30 h-full'/>
                    {isMobile && (
                        <div 
                            className='md:hidden flex text-black cursor-pointer' 
                            onClick={() => setExpandNav(false)}
                        >
                            <MdCancel size={'1.8rem'} />
                        </div>
                    )}
                </div>
                <div 
                    className={`${active === 'home' ? 'bg-purple-200' : 'hover:bg-purple-100'} cursor-pointer transition-all duration-300 p-8 text-lg`} 
                    onClick={() => navigate('/dashboard')}
                >
                    Home
                </div>
                <div 
                    className={`${active === 'products' ? 'bg-purple-200' : 'hover:bg-purple-100'} cursor-pointer transition-all duration-300 p-8 text-lg`} 
                    onClick={() => navigate('/products')}
                >
                    Products
                </div>
                <div 
                    className={`${active === 'carousel' ? 'bg-purple-200' : 'hover:bg-purple-100'} cursor-pointer transition-all duration-300 p-8 text-lg`} 
                    onClick={() => navigate('/carousel')}
                >
                    Carousel
                </div>
                <div 
                    className={`${active === 'special-offer' ? 'bg-purple-200' : 'hover:bg-purple-100'} cursor-pointer transition-all duration-300 p-8 text-lg`} 
                    onClick={() => navigate('/offer')}
                >
                    Special Offer
                </div>
            </div>
            <div 
                className='m-5 w-80 hover:bg-red-800 hover:text-gray-50 rounded-lg p-5 flex items-center gap-2 text-lg cursor-pointer transition-all duration-300'
                onClick={logOut}
            >
                <CiLogout />
                Log Out
            </div>
        </>
    );

    return ( 
        <div className="md:min-h-full w-100 flex fixed">
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

            {isMobile ? (
                // ✅ Animate only on mobile
                <AnimatePresence mode='sync'>
                    {expandNav && (
                        <Motion.div
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.5}}
                            className="dashboard-sidebar flex flex-col bg-amber-50 w-full justify-between"
                        >
                            {sidebarContent}
                        </Motion.div>
                    )}

                    {/* Menu button for mobile */}
                    {!expandNav && (
                        <div 
                            className="flex md:hidden p-8 text-2xl cursor-pointer" 
                            onClick={() => setExpandNav(true)}
                        >
                            <MdOutlineMenu/>
                        </div>
                    )}
                </AnimatePresence>
            ) : (
                // ✅ Static sidebar on desktop
                <div className="dashboard-sidebar md:flex flex-col bg-amber-50 w-full justify-between">
                    {sidebarContent}
                </div>
            )}
        </div>
    )
}
