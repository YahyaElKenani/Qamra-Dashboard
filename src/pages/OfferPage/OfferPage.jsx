import { useEffect, useState } from "react";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import { AiFillAlert } from "react-icons/ai";
import { supabase } from "../../server/supabase-client";
import Loading from "../../UI/Loading/Loading";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { uploadImage } from "../../Util/uploadImage";
import { showToast } from "../../UI/Toast/showToast";
import LoadingButton from "../../UI/Buttons/LoadingButton"
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Util/isLoggedIn";
import { AnimatePresence, motion as Motion } from "framer-motion";
export default function OfferPage() { 
    const [offer, setOffer] = useState({});
    const [loading, setLoading] = useState(true);
    const [thumbnail, setThumbnail] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const getOffer = async () => { 
        setLoading(true);
        const {data, error} = await supabase.from('offer').select('*');
        if (error) { 
            return;
        }
        setOffer(data[0]);
        setLoading(false);
    }
    useEffect(() => {
        getOffer(); 
        }, []);

    useEffect(() => {
        if (offer?.image) { 
            setThumbnail(offer.image)
        }
    }, [offer.image])

    useEffect(() => {
        const checkLogin = async () => { 
            const loggedIn = await isLoggedIn();
            if (loggedIn === false) { 
            navigate('/unauthorized');
            }
        }
        checkLogin()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (thumbnail !== offer.image) { 
            const imageUrl = await uploadImage(thumbnail); 
            const {error} = await supabase.from('offer').update({...offer, image: imageUrl}).eq('id', offer.id);
            if (error) { 
                showToast('error', 'Error Updating Offer, Please try again');
                setIsSubmitting(false);
                return;
            } else { 
                showToast('success', 'Offer Updated Successfully!');
                setIsSubmitting(false);
                return;
            }
        }

        const {error} = await supabase.from('offer').update({...offer}).eq('id', offer.id);
        if (error) { 
            showToast('error', 'Error Updating Offer, Please try again');
            setIsSubmitting(false);
            return;
        } else { 
            showToast('success', 'Offer Updated Successfully!');
            setIsSubmitting(false);
            return;
        }
    }
    return ( 
        <div className="flex"> 
            <DashboardSidebar active={'special-offer'} /> 
            <AnimatePresence mode="sync">
                <Motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.7}}
                className="p-8 my-12 md:p-30 md:ms-100 flex flex-col gap-10 w-full md:w-6/7"> 
                {
                    loading ? 
                    <Loading /> 
                    : 
                    <> 
                        <h1 className="text-3xl font-bold flex items-center gap-3"><AiFillAlert/> Offer</h1>
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}> 
                            <div className="flex flex-col gap-3">
                                <label htmlFor="title" className="text-xl">Title</label>
                                <input type="text"  id="title"
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                placeholder={offer.title}
                                onChange={(e) => setOffer((prevState) => ({...prevState, title: e.target.value}))}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="subtitle" className="text-xl">Subtitle</label>
                                <input type="text" id="subtitle"
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                placeholder={offer.subtitle}
                                onChange={(e) => setOffer((prevState) => ({...prevState, subtitle: e.target.value}))}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="description" className="text-xl">Description ( Optional )</label>
                                <input type="text" id="description"
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                placeholder={offer.description}
                                onChange={(e) => setOffer((prevState) => ({...prevState, description: e.target.value}))}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="title" className="text-xl">Arabic Title</label>
                                <input type="text"  id="title"
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                placeholder={offer.title_ar}
                                onChange={(e) => setOffer((prevState) => ({...prevState, title_ar: e.target.value}))}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="subtitle" className="text-xl">Arabic Subtitle</label>
                                <input type="text" id="subtitle"
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                placeholder={offer.subtitle_ar}
                                onChange={(e) => setOffer((prevState) => ({...prevState, subtitle_ar: e.target.value}))}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="description" className="text-xl">Arabic Description ( Optional )</label>
                                <input type="text" id="description"
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                placeholder={offer.description_ar}
                                onChange={(e) => setOffer((prevState) => ({...prevState, description_ar: e.target.value}))}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="title" className="text-xl">Image ( Optional )</label>
                                <input type="file"
                                className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                onChange={(e) => setThumbnail(e.target.files[0])}
                                />
                            </div>
                            { 
                                isSubmitting === true ? 
                                <LoadingButton label={'Confirming Changes...'} /> 
                                : 
                                <ConfirmButton label={'Confirm Changes'} />
                            }
                        </form>
                    </>
                }
                </Motion.div>
            </AnimatePresence>
        </div>
    )
}