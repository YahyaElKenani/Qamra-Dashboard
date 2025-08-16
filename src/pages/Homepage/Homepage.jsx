import { useEffect } from "react";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import { AiFillProduct } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Util/isLoggedIn";
import { AnimatePresence, motion as Motion } from "framer-motion";
export default function Homepage({products}) { 
    const navigate = useNavigate();
    useEffect(() => {
        const checkLogin = async () => { 
            const loggedIn = await isLoggedIn();
            if (!loggedIn) { 
                navigate('/unauthorized');
            }
        } 
        checkLogin()
    }, [navigate])
    return ( 
        <div className="dashboard-home flex"> 
            <DashboardSidebar active={'home'} />
            <AnimatePresence mode="sync"> 
                <Motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.7}}
                className="dashboard-content p-8 my-15 md:p-30 md:ms-100 flex flex-col gap-5">
                    <p className="text-3xl md:text-5xl font-bold">Home</p>
                    <div className="flex gap-3">
                        <div className="bg-gray-50 p-5 text-xl md:text-2xl flex flex-col min-w-[200px] md:min-w-[300px] rounded-2xl">
                            <div><AiFillProduct /></div>
                            <div>Products</div>
                            <div className="self-end">{products ? products.length : 0}</div>
                            </div>
                    </div>
                </Motion.div>
            </AnimatePresence>
        </div>
    )
}