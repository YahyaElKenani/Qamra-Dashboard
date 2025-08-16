import { supabase } from "../server/supabase-client";
import {showToast} from '../UI/Toast/showToast'
export async function deleteProduct(productId) { 
    const {error} = await supabase.from('products').delete().eq('product_id', productId);
    if (error) { 
        showToast('error', 'Error Deleting Product, Please Try again')
        return; 
    } else { 
        showToast('success', 'Product Deleted Successfully!');
    }
} 