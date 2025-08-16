import { useState } from "react";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { IoIosCreate } from "react-icons/io";
import { validateProduct } from "../../Util/validateProduct";
import { createProduct } from "../../Util/createProduct";
import LoadingButton from "../../UI/Buttons/LoadingButton";
export default function CreateProductPage() { 
    const [onSale, setOnSale] = useState(false);
    const [availability, setAvailability] = useState(true);
    const [newProduct, setNewProduct] = useState({title: '', price: 0, length: 0, width: 0, images: null, saleAmount: null});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setIsSubmitting(true);
        if (validateProduct(newProduct.title, newProduct.price, newProduct.length, newProduct.width, newProduct.images, availability, onSale) === true) { 
            const submit = await createProduct(newProduct.title, newProduct.price, newProduct.length, 
                newProduct.width, availability, newProduct.images, onSale, newProduct.saleAmount);
            if (submit === true) { 
                setIsSubmitting(false);
                return;
            }
        } else { 
            setIsSubmitting(false);
        }
    }
    return ( 
        <div className="flex"> 
            <DashboardSidebar active={null}/>
            <div className="p-8 my-12 md:p-30 md:ms-100 flex flex-col gap-10 w-90 md:w-6/7">
                    <h1 className="text-3xl font-bold flex gap-3 items-center"><IoIosCreate/> Create Product</h1>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}> 

                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-xl">Title</label>
                            <input type="text" id="title" placeholder="Enter new product title" 
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setNewProduct((prevState) => ({...prevState, title: e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="text-xl">Price</label>
                            <input type="number" id="price" placeholder="Enter new product price" 
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setNewProduct((prevState) => ({...prevState, price: +e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="length" className="text-xl">Length</label>
                            <input type="number" id="length" placeholder="Enter new product length" 
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setNewProduct((prevState) => ({...prevState, length: +e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="width" className="text-xl">Width</label>
                            <input type="number" id="width" placeholder="Enter new product width" 
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setNewProduct((prevState) => ({...prevState, width: +e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-xl">Availability</div>
                            <div className="flex gap-2"> 
                                <input type="radio" name="availability" value={true} onChange={(e) => setAvailability(e.target.value)}/>
                                <label>Available</label>
                            </div>
                            <div className="flex gap-2"> 
                                <input type="radio" name="availability" value={false} onChange={(e) => setAvailability(e.target.value)} />
                                <label> Not Available </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-xl">Sale</div>
                            <div className="flex gap-2"> 
                                <input type="radio" name="sale" value={true} onChange={(e) => setOnSale(e.target.value)} />
                                <label>On</label>
                            </div>
                            <div className="flex gap-2"> 
                                <input type="radio" name="sale" value={false} onChange={(e) => setOnSale(e.target.value)} />
                                <label>Off</label>
                            </div>
                        </div>

                        { 
                            onSale === 'true' && 
                            <div className="flex flex-col gap-2">
                                <label htmlFor="sale-amount" className="text-xl">Sale Amount (%)</label>
                                <input type="number" id="sale-amount" placeholder="Enter new product sale" 
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                onChange={(e) => setNewProduct((prevState) => ({...prevState, saleAmount: e.target.value}))}
                                />
                            </div>
                        }

                        <div className="flex flex-col gap-2">
                            <label htmlFor="width" className="text-xl">Image</label>
                            <input type="file" accept="image/*" id="width" placeholder="Enter new product width" 
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setNewProduct((prevState) => ({...prevState, images: e.target.files[0]}))}
                            />
                        </div>
                        { 
                            isSubmitting === true ? 
                            <LoadingButton label={'Creating New Product...'}/> 
                            :
                            <ConfirmButton label={'Submit New Product'}/>
                        }
                    </form>
            </div> 
        </div>
    )
}