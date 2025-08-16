import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import { MdViewCarousel } from "react-icons/md";
import ConfirmButton from "../../UI/Buttons/ConfirmButton";
import { useEffect, useState } from "react";
import { supabase } from "../../server/supabase-client";
import Loading from "../../UI/Loading/Loading";
import { uploadImage } from "../../Util/uploadImage";
import { showToast } from "../../UI/Toast/showToast";
import { isLoggedIn } from "../../Util/isLoggedIn";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion } from 'framer-motion'
export default function CarouselPage() { 
    const [carousel, setCarousel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cleanedUrl, setCleanedUrl] = useState([]);
    const [firstSlide, setFirstSlide] = useState();
    const [secondSlide, setSecondSlide] = useState();
    const [thirdSlide, setThirdSlide] = useState();
    const [images, setImages] = useState({imageOne: "", imageTwo: "", imageThree: ""});
    const navigate = useNavigate();
    const getCarouselItems = async () => { 
        setLoading(true);
        const {data, error} = await supabase.from('carousel').select('*'); 
        if (error) { 
            return;
        } 
        setCarousel(data);
        setLoading(false);
    }
    useEffect(() => {getCarouselItems()}, [])
    useEffect(() => {
        if (carousel[0]) { 
            const cleanedUrlOne = carousel[0].image.replace(/\\?"/g, '');
            const cleanedUrlTwo = carousel[1].image.replace(/\\?"/g, '');
            const cleanedUrlThree = carousel[2].image.replace(/\\?"/g, '');
            setCleanedUrl([cleanedUrlOne, cleanedUrlTwo, cleanedUrlThree]);
        }
    }, [carousel])

    useEffect(() => { 
        if (carousel) { 
            setFirstSlide(carousel[0]);
            setSecondSlide(carousel[1]);
            setThirdSlide(carousel[2]);
            setImages((prevState) => ({...prevState, imageOne: carousel[0]?.image}))
            setImages((prevState) => ({...prevState, imageTwo: carousel[1]?.image}))
            setImages((prevState) => ({...prevState, imageThree: carousel[2]?.image}))
        }
    }
    , [carousel])

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (images.imageOne !== carousel[0]?.image) { 
            const imageUrl = await uploadImage(images.imageOne);
            const {error} = await supabase.from('carousel').update({...firstSlide, image: imageUrl}).eq('id', 1); 
            if (error) { 
                showToast('error', 'Error Uploading Image, Please try again');
                return 
            }
        }
        if (images.imageTwo !== carousel[1]?.image) { 
            const imageUrl = await uploadImage(images.imageTwo);
            const {error} = await supabase.from('carousel').update({...secondSlide, image: imageUrl}).eq('id', 2); 
            if (error) { 
                showToast('error', 'Error Uploading Image, Please try again');
                return 
            }
        }
        if (images.imageThree !== carousel[2]?.image) { 
            const imageUrl = await uploadImage(images.imageThree);
            const {error} = await supabase.from('carousel').update({...thirdSlide, image: imageUrl}).eq('id', 3); 
            if (error) { 
                showToast('error', 'Error Uploading Image, Please try again');
                return;
            }
        }

        const {error1} = await supabase.from('carousel').update({...firstSlide}).eq('id', 1)
        const {error2} = await supabase.from('carousel').update({...secondSlide}).eq('id', 2)
        const {error3} = await supabase.from('carousel').update({...thirdSlide}).eq('id', 3)
        if (error1 || error2 || error3) { 
            showToast('error', 'Error Updating Carousel, Please try again');
            return
        };
        showToast('success', 'Carousel Updated Successfully!');
    }
        useEffect(() => {
            const checkLogin = async () => { 
                const loggedIn = await isLoggedIn();
                if (loggedIn === false) { 
                navigate('/unauthorized');
                }
            }
            checkLogin()
        }, [])
    return (
        <div className="flex">
            <DashboardSidebar active={'carousel'}/>
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
                <div className="flex gap-3 text-5xl items-center font-bold"> <MdViewCarousel/> Carousel</div>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}> 
                        <div className="slide-one flex flex-col gap-4"> 
                            <div className="text-3xl font-bold">Slide 1</div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="title" className="text-xl">Title</label>
                                    <input type="text" id="title"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[0].title}
                                    onChange={(e) => setFirstSlide((prevState) => ({...prevState, title: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="subtitle" className="text-xl">Subtitle</label>
                                    <input type="text" id="subtitle"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[0].subtitle}
                                    onChange={(e) => setFirstSlide((prevState) => ({...prevState, subtitle: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="artitle" className="text-xl">Arabic Title</label>
                                    <input type="text" id="artitle" 
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[0].title_ar}
                                    onChange={(e) => setFirstSlide((prevState) => ({...prevState, title_ar: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="arsubtitle" className="text-xl">Arabic Subtitle</label>
                                    <input type="text" id="arsubtitle"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[0].subtitle_ar}
                                    onChange={(e) => setFirstSlide((prevState) => ({...prevState, subtitle_ar: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="img" className="text-xl">Image</label>
                                    <input type="file" id="img"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    onChange={(e) => setImages((prevState) => ({...prevState, imageOne: e.target.files[0]}))}
                                    />
                                    <img src={cleanedUrl[0]} alt="thumbnail" className="w-100 h-50 object-contain"/>
                                </div>
                        </div>

                        <div className="slide-two flex flex-col gap-4"> 
                            <div className="text-3xl font-bold">Slide 2</div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="title2" className="text-xl">Title</label>
                                    <input type="text" id="title2"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[1].title}
                                    onChange={(e) => setSecondSlide((prevState) => ({...prevState, title: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="subtitle2" className="text-xl">Subtitle</label>
                                    <input type="text" id="subtitle2"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[1].subtitle}
                                    onChange={(e) => setSecondSlide((prevState) => ({...prevState, subtitle: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="artitle2" className="text-xl">Arabic Title</label>
                                    <input type="text" id="artitle2" 
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[1].title_ar}
                                    onChange={(e) => setSecondSlide((prevState) => ({...prevState, title_ar: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="arsubtitle2" className="text-xl">Arabic Subtitle</label>
                                    <input type="text" id="arsubtitle2"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[1].subtitle_ar}
                                    onChange={(e) => setSecondSlide((prevState) => ({...prevState, subtitle_ar: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="img2" className="text-xl">Image</label>
                                    <input type="file" id="img2"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    onChange={(e) => setImages((prevState) => ({...prevState, imageTwo: e.target.files[0]}))}
                                    />
                                    <img src={cleanedUrl[1]} alt="thumbnail" className="w-100 h-50 object-contain"/>
                            </div>
                        </div>

                        <div className="slide-three flex flex-col gap-4"> 
                            <div className="text-3xl font-bold">Slide 3</div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="title3" className="text-xl">Title</label>
                                    <input type="text" id="title3"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[2].title}
                                    onChange={(e) => setThirdSlide((prevState) => ({...prevState, title: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="subtitle3" className="text-xl">Subtitle</label>
                                    <input type="text" id="subtitle3"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[2].subtitle}
                                    onChange={(e) => setThirdSlide((prevState) => ({...prevState, subtitle: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="artitle3" className="text-xl">Arabic Title</label>
                                    <input type="text" id="artitle3"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[2].title_ar}
                                    onChange={(e) => setThirdSlide((prevState) => ({...prevState, title_ar: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="arsubtitle3" className="text-xl">Arabic Subtitle</label>
                                    <input type="text" id="arsubtitle3"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    placeholder={carousel[2].subtitle_ar}
                                    onChange={(e) => setThirdSlide((prevState) => ({...prevState, subtitle_ar: e.target.value}))}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="img3" className="text-xl">Image</label>
                                    <input type="file" id="img3"
                                    className="border-2 border-purple-300 focus:outline-none focus:border-purple-500 p-3 rounded-xl"
                                    onChange={(e) => setImages((prevState) => ({...prevState, imageThree: e.target.files[0]}))}
                                    />
                                    <img src={cleanedUrl[2]} alt="thumbnail" className="w-100 h-50 object-contain" />
                            </div>
                        </div>
                        <ConfirmButton label={'Submit Changes'}/>
                    </form>
                        </>
                    }
                </Motion.div>
            </AnimatePresence>
        </div>
    )
}