'use client';
import { getUserOrders } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import axios from "axios";
import { User } from "@/models/user";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import {GiMoneyStack} from 'react-icons/gi'
import OrdersTable from "@/components/OrdersTable/OrdersTable";
import Chart from "@/components/Chart/Chart";
import RatingModal from "@/components/RatingModal/RatingModal";
import BackDrop from "@/components/BackDrop/BackDrop";
import toast from "react-hot-toast";

const UserDetails = (props :{params:{id:string}}) => {
    const {params:{id:userId}} = props;
    const [currentNav,setCurrentNav] = useState<'orders' | 'amounts' | 'ratings'>('orders');
    const [productId,setProductId] = useState<string|null>(null);
    const [isRatingVisible,setIsRatingVisible] = useState<boolean>(false);
    const [isSubmittingReview,setIsSubmittingReview] = useState(false);
    const toggleRatingModal = () =>
    {   setIsRatingVisible(prev => !prev);
    }
    const reviewSubmitHandler = async (rating:number,opinion:string) =>{
        //handle submit review
        if(!opinion.trim().length || !rating) {
            toast.error('please provide a rating and let us know what you think!',)
        }
        if(!productId) toast.error('product unkown');
        try {
            setIsSubmittingReview(true);
            const {data} = await axios.post("/api/users",{
                productId,
                reviewText:opinion,
                ratingValue:rating
            });
            console.log(data);
            toast.success("review was submitted successfully")
        } catch (error) {
            console.log(error);
            toast.error('something went wrong! try again later or contact us')
        }
        finally{
            setIsRatingVisible(false);
            setIsSubmittingReview(false);
            setProductId(null);
        }
    }

    const fetchUserOrders = async() =>(
        await getUserOrders(userId)
    );
    const fetchUserData = async() => {const data = await axios.get('/api/users');
                                        return data.data;
                                   }
    const {data:userorders,error,isLoading} = useSWR('/api/userorders',fetchUserOrders);
    const {data:userdata,error:userError,isLoading:userisLoading} =useSWR('/api/userdata',fetchUserData,)
    
  if (error || userError) throw new Error('Cannot fetch data');
  if (typeof userorders === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');
  if (typeof userdata === 'undefined' && !userisLoading)
    throw new Error('Cannot fetch data');

  if (userisLoading) return <LoadingSpinner />;
  if (!userdata) throw new Error('Cannot fetch data');
  if (!userorders) throw new Error('Cannot fetch data');
    return (
    <div className="container mx-auto px-2 md:px-4 py-10">
        <div className="grid md:grid-cols-12 gap-10">
            <div className="hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4">
                <div className="md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
                    <Image src={userdata.image}
                    alt={'user image'}
                    width={143}
                    height={143}
                    className="img scale-animation rounded-full"/>
                </div>
                <div className="font-normal py-4 text-left">
                    <h6 className="text-xl font-bold pb-3">
                        About
                    </h6>
                    <p className="text-sm ">
                        {userdata.about}
                    </p>
                </div>
                <div className="font-normal text-left">
                    <h6 className="text-xl font-bold opb-3"> 
                        {userdata.name}
                    </h6>
                </div>
                <div className="flex items-center">
                    <p className="mr-2">Sign out</p>
                    <FaSignOutAlt className="text-3xl cursor pointer" onClick={()=>signOut({callbackUrl:'/'})}/>
                </div>
            </div>
            <div className="md:col-span-8 lg:col-span-9 ">
                <div className="flex items-center">
                       <h5 className="text-2xl font-bold mr-3">
                            Hello, {userdata.name}!
                        </h5> 
                </div>
                <div className="md:hidden w-14 h-14 rounded-l-full overflow-hidden">
                    <Image src={userdata.image} alt={"profile picture"} className="img scale-animation rounded-full" width={56} height={56}/>
                </div>
                <p className="block w-fit md:hidden text-sm py-2">
                    {userdata.about??''}
                </p>
                <p className="text-xs py-2 font-medium">Member since {userdata._createdAt.split("T")[0]}</p>
                <div className="md:hidden flex items-center my-2 ">
                    <p className="mr-2 ">Sign out</p>
                <FaSignOutAlt className="text-3xl cursor pointer" onClick={()=>signOut({callbackUrl:'/'})}/>
                </div>
                <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb--8 text-gray-700
                border-gray-200 rounded-lg bg-gray-50 mt-7">
                        <ol className={`${currentNav==="orders" ? "text-blue-600" : "text-gray-700"} inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}>
                            <li className="inline-flex items-center cursor-pointer" onClick={()=>setCurrentNav('orders')}>
                                <BsJournalBookmarkFill/>
                                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                                    My Orders
                                </a>
                            </li>
                        </ol>
                          <ol className={`${currentNav==="amounts" ? "text-blue-600" : "text-gray-700"} inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}>
                            <li className="inline-flex items-center cursor-pointer" onClick={()=>setCurrentNav('amounts')}>
                                <GiMoneyStack/>
                                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                                    Amount spent
                                </a>
                            </li>
                        </ol>
                </nav>
                   {currentNav === 'orders' ? userorders && <OrdersTable orderDetails={userorders} setProductId={setProductId} toggleRatingModal={toggleRatingModal} /> : <></> } 
                    {currentNav ==='amounts' ? userorders && <Chart userOrders={userorders}/>:''}
            </div>
        </div>
        <RatingModal isOpen={isRatingVisible}  reviewSubmitHandler={reviewSubmitHandler} isSubmittingReview = {isSubmittingReview} toggleRatingModal={toggleRatingModal}/>
        <BackDrop isOpen={isRatingVisible}/>
    </div>
  )
}

export default UserDetails;