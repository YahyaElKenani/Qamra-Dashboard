import { Bounce, toast } from "react-toastify";

export function showToast(type, message) { 
    if (type === 'error') { 
        toast.error(message, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
            });
    } else if (type === 'success') { 
        toast.success(message, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
            });
    }
}