import { supabase } from "../server/supabase-client";
import { showToast } from "../UI/Toast/showToast";

export async function uploadImage(image) { 
    const filePath = `${image.name}-${Date.now()}`
    const {error} = await supabase.storage.from('product-images').upload(filePath, image)
    if (error) { 
        showToast('error', `Couldnt upload image to storage` ); 
        return false;
    }
    const {data} = supabase.storage.from('product-images').getPublicUrl(filePath); 
    return data.publicUrl;
}