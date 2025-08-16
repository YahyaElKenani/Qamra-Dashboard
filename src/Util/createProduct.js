import { supabase } from "../server/supabase-client";
import { v4 as uuid } from "uuid";
import { uploadImage } from "./uploadImage";
import { showToast } from "../UI/Toast/showToast";
export async function createProduct(title, price, length, width, availability, images, sale, saleAmount) { 
    const id = uuid();
    const imageUrl = await uploadImage(images);
    const {error} = await supabase.from('products').insert({ 
        product_id: id,
        title: title, 
        price: price,
        length: length, 
        width: width, 
        is_available: availability,
        on_sale: sale,
        sale_amount: saleAmount || null,
        images: [imageUrl]
    }).single()
    if (error) { 
        showToast('error', 'Couldnt create product');
        return true;
    } else { 
        showToast('success', 'New product added');
        return true;
    }
}