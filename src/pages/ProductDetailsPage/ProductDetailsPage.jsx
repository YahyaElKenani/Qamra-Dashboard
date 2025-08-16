import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../../server/supabase-client";
import { useEffect, useState } from "react";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import { PiSubtitlesFill } from "react-icons/pi";
import { IoIosPricetags } from "react-icons/io";
import { FaRuler } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import Loading from "../../UI/Loading/Loading";
export default function ProductDetailsPage() { 
    const {product_id} = useParams(); 
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    const getProductById = async () => { 
        setLoading(true);
        const {data, error} = await supabase.from('products').select('*').eq("product_id", product_id);
        if (error) { 
            return;
        } else { 
            setLoading(false);
            setProduct(data[0]);
        }
    }
    useEffect(() => {getProductById()}, [])
    return ( 
        <div className="flex">
            <DashboardSidebar active={null} />
            <div className="p-40 ms-100 flex flex-col gap-10 w-6/7">
            { 
                loading ? 
                <Loading /> 
                : 
                <> 
                    <h1 className="text-3xl font-bold flex gap-3"><PiSubtitlesFill/> Product Title: {product?.title}</h1>
                    <div className="text-3xl flex gap-3"><IoIosPricetags/> Product Price: {product?.price} EGP</div>
                    <div className="text-3xl flex gap-3"><FaRuler /> Product Length: {product?.length}</div>
                    <div className="text-3xl flex gap-3"><FaRuler /> Product Width: {product?.width}</div>
                    <div className="text-3xl flex gap-3"> <BsCheckCircleFill/> Product Availability: 
                    {
                    product.is_available ? 
                    <div className="flex gap-3 items-center">
                        <div className="h-3 w-3 bg-lime-500 rounded-full"></div>
                        <div>Available</div>
                    </div> 
                    :
                    <div className="flex gap-3 items-center">
                        <div className="h-3 w-3 bg-yellow-600 rounded-full"></div>
                        <div>Not Available</div>
                    </div> 
                    }
                    </div>
                    <div className="text-3xl flex flex-col gap-7">
                    <div className="flex gap-3"> 
                        <FaRegImage />
                        <div>
                            Product Images: 
                        </div>
                    </div>
                    <div className="flex flex-wrap w-full justify-evenly">
                    {product.images && 
                        product.images.map((img) => (<img src={img} alt="product-image" className="object-contain w-100 h-100 rounded-lg border-8 border-purple-300"/>))
                    }</div>
                    </div>
                    <ConfirmButton label={'Edit Product'} fn={() => navigate(`/edit/${product_id}`)}/>
                </>
            }
            </div>
        </div>
    )
}