import { useEffect, useState } from "react";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import Card from "../../UI/Card/Card";
import { supabase } from "../../server/supabase-client";
import Loading from "../../UI/Loading/Loading";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Util/isLoggedIn";
import { AnimatePresence, motion as Motion } from "framer-motion";
export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const fetchProducts = async () => { 
        setIsLoading(true);
        const {data, error} = await supabase.from('products').select('*'); 
        if (error) { 
            return;
        } else { 
            setProducts(data);
            setIsLoading(false);
        }
    }

    useEffect(() => {fetchProducts()}, []);
    useEffect(() => {
        const checkLogin = async () => { 
            const loggedIn = await isLoggedIn();
            if (loggedIn === false) { 
            navigate('/unauthorized');
            }
        }
        checkLogin()
    }, [])
    return ( 
        <div className="flex"> 
            <DashboardSidebar active={'products'} />
            { 
                isLoading ? 
                <Loading /> 
                :
                <AnimatePresence mode="sync"> 
                    <Motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.7}}
                    className="dashboard-content p-8 my-12 md:p-30 md:ms-100 justify-center flex flex-col gap-5 w-full md:w-6/7">
                        <p className="text-5xl font-bold">Products</p>
                        { 
                            products && 
                            products.map((product) => <Card key={product.product_id} product={product}/>)
                        }
                        <ConfirmButton label={'+ Add Product'} fn={() => navigate('/create-product')}/>
                    </Motion.div>
                </AnimatePresence>
            }
        </div>
    )
}