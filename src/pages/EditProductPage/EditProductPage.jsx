import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { supabase } from "../../server/supabase-client";
import Loading from "../../UI/Loading/Loading";
import { uploadImage } from "../../Util/uploadImage";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelButton from "../../UI/Buttons/CancelButton";
import LoadingButton from '../../UI/Buttons/LoadingButton'
import { showToast } from "../../UI/Toast/showToast";
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid var(--color-purple-600)',
    borderRadius: '12px',
    boxShadow: 12,
    p: 4,
};
export default function EditProductPage() { 
    const {product_id} = useParams();
    const [loading, setLoading] = useState(true); 
    const [product, setProduct] = useState({}); 
    const [newImage, setNewImage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmOperation, setConfirmOperation] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
        const getProductById = async () => { 
        setLoading(true);
        const {data, error} = await supabase.from('products').select('*').eq('product_id', product_id); 
        if (error) { 
            return;
        } else { 
            setProduct(data[0]);
            setLoading(false);
        }
    }

    const updateProduct = async () => { 
        if (product) { 
            if (newImage !== '') { 
                const imageUrl = await uploadImage(newImage);
                const {error1} = await supabase.from('products').update({...product, images: [...product.images, imageUrl]}).eq('product_id', product.product_id); 
                if (error1) { 
                    setIsSubmitting(false);
                    return;
                } else { 
                    return;
                }
            } else { 
                const {error} = await supabase.from('products').update({...product}).eq('product_id', product.product_id); 
                if (error) {
                    showToast('error', 'Error Updating Product, Please Try Again');
                    return;
                } else { 
                    showToast('success', 'Product Updated Successfully!')
                }
            }
        }
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setModalIsOpen(true);
        setIsSubmitting(true);
    }
    useEffect(() => {getProductById()}, [])

    const handleDelete = async (target) => { 
        const images = product.images.filter((img) => target !== img); 
        setProduct((prevState) => ({...prevState, images: images || []}));
        const {error} = await supabase.from('products').update({images: [...images]}).eq('product_id', product_id);
        if (error) { 
            showToast('error', 'Error Deleting Image')
            return;
        } else {
            showToast('success', 'Image Deleted!');
        }
    }

    useEffect(() => {
        if (confirmOperation) {
            updateProduct();
            setConfirmOperation(false);
        }
        setIsSubmitting(false);
        setModalIsOpen(false);
    }, [confirmOperation])
    
    const handleClose = () => setModalIsOpen(false);
    return ( 
        <div className="flex"> 
            <DashboardSidebar active={null} />
            <div className="p-40 ms-100 flex flex-col gap-10 w-6/7"> 
            { 
                loading ? 
                <Loading /> 
                : 
                <> 
                    <Modal
                    open={modalIsOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            Update Product
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Are you sure you want to update this product?
                            </Typography>
                            <div className="flex gap-3 mt-3"> 
                                <CancelButton label={'Cancel'} fn={() => setConfirmOperation(false)}/>
                                <ConfirmButton label={'Confirm'} fn={() => setConfirmOperation(true)}/>
                            </div>
                        </Box>
                    </Modal>
                    <h1 className="text-3xl font-bold flex gap-3 items-center"><FaEdit /> Edit Product</h1>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}> 

                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-xl">Title</label>
                            <input type="text" id="title" placeholder={product.title}
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setProduct((prevState) => ({...prevState, title: e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="price" className="text-xl">Price</label>
                            <input type="number" id="price" placeholder={product.price}
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setProduct((prevState) => ({...prevState, price: +e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="length" className="text-xl">Length</label>
                            <input type="number" id="length" placeholder={product.length}
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setProduct((prevState) => ({...prevState, length: +e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="width" className="text-xl">Width</label>
                            <input type="number" id="width" placeholder={product.width}
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setProduct((prevState) => ({...prevState, width: +e.target.value}))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-xl">Availability</div>
                            <div className="flex gap-2"> 
                                <input type="radio" name="availability" value={true} 
                                onChange={(e) => setProduct((prevState) => ({...prevState, is_available: e.target.value}))} />
                                <label>Available</label>
                            </div>
                            <div className="flex gap-2"> 
                                <input type="radio" name="availability" value={false} 
                                onChange={(e) => setProduct((prevState) => ({...prevState, is_available: e.target.value}))} />
                                <label> Not Available </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-xl">Sale</div>
                            <div className="flex gap-2"> 
                                <input type="radio" name="sale" value={true} 
                                onChange={(e) => setProduct((prevState) => ({...prevState, on_sale: e.target.value}))} />
                                <label>On</label>
                            </div>
                            <div className="flex gap-2"> 
                                <input type="radio" name="sale" value={false}
                                onChange={(e) => setProduct((prevState) => ({...prevState, on_sale: e.target.value}))} />
                                <label>Off</label>
                            </div>
                        </div>

                        { 
                            product.on_sale === 'true' && 
                            <div className="flex flex-col gap-2">
                                <label htmlFor="sale-amount" className="text-xl">Sale Amount (%)</label>
                                <input type="number" id="sale-amount" placeholder="Enter new product sale" 
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                onChange={(e) => setProduct((prevState) => ({...prevState, sale_amount: +e.target.value}))}
                                />
                            </div>
                        }

                        <div className="flex flex-col gap-2">
                            <label htmlFor="width" className="text-xl">Images</label>
                            <input type="file" accept="image/*" id="width" placeholder="Enter new product width" 
                            className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                            onChange={(e) => setNewImage(e.target.files[0])}
                            />
                            <div className="flex flex-wrap justify-evenly">
                                { 
                                    product && product.images.length > 0 &&
                                    product.images.map((img, index) => ( 
                                    <div key={product.product_id} className="remove-img w-50 h-50">
                                        <MdDelete className="absolute h-9 w-9 rounded-full bg-red-600 text-gray-50 p-2 cursor-pointer hover:opacity-75"
                                        onClick={() => handleDelete(product.images[index])}
                                        />
                                        <img src={img} alt="product-image" className="w-full h-full object-contain" />
                                    </div>
                                    ))
                                }
                            </div>
                        </div>
                        { 
                            isSubmitting === true ? 
                            <LoadingButton label={'Submitting Changes...'} /> 
                            : 
                            <ConfirmButton label={'Submit Changes'}/>
                        }
                    </form>
                </>
            }
            </div>
        </div>
    )
}