import { showToast } from "../UI/Toast/showToast";

export function validateProduct(title, price, length, width, images, availability, sale) { 
    if (!title || !price || !length || !width || !images || !availability || !sale) { 
        showToast("error", 'Some inputs are empty!');
        return false; 
    }
    return true
}