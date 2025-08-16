import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteButton from "../Buttons/DeleteButton";
import CancelButton from "../../UI/Buttons/CancelButton";

import { useState } from "react";
import { deleteProduct } from "../../Util/deleteProduct";
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid var(--color-purple-600)',
    borderRadius: '12px',
    boxShadow: 12,
    p: 4,
};
export default function Card({product}) { 
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setModalIsOpen(false);
    return ( 
        <> 
            <Modal
            open={modalIsOpen}
            onClose={handleClose}
            keepMounted={false}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Delete Product
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this product?
                    </Typography>
                    <div className="flex gap-3 mt-3"> 
                        <CancelButton label={'Cancel'} fn={() => setModalIsOpen(false)}/>
                        <DeleteButton label={'Delete'} fn={() => {deleteProduct(product.product_id); setModalIsOpen(false)}} />
                    </div>
                </Box>
            </Modal>
        <div className="flex flex-col md:flex-row justify-between w-full p-6 md:p-10 bg-amber-50 border-t-8 border-t-purple-600
            md:border-s-8 md:border-s-purple-600 md:border-t-0 items-center rounded-2xl gap-5">
            <div className="flex flex-col md:flex-row w-full md:w-1/5 items-center gap-5 md:gap-10"> 
                <img src={product?.images[0]} alt="thumbnail" className="h-50 w-full md:w-50 object-cover" />
                <div className="text-2xl font-bold md:text-3xl">{product?.title || 'Product Title'}</div>
            </div>
            <div className="flex md:w-1/12 text-2xl justify-between gap-3 md:gap-0"> 
                <div className="cursor-pointer hover:text-cyan-600 transition-all duration-350" 
                onClick={() => navigate(`/product/${product.product_id}`)}><FaEye /></div>

                <div className="cursor-pointer hover:text-lime-600 transition-all duration-350">
                    <MdEdit onClick={() => navigate(`/edit/${product.product_id}`)} />           
                    </div>
                
                <div className="cursor-pointer hover:text-red-600 transition-all duration-350"
                onClick={() => setModalIsOpen(true)}
                ><MdDelete /></div>
            </div>
        </div>
        
        </>
    )
}