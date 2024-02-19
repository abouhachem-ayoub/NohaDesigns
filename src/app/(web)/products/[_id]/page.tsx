"use client"

import { getOrder, getProduct } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import ProductPhotoGallery from "@/components/ProductPhotoGallery/ProductPhotoGallery";
import GetProductCta from "@/components/GetProductCta/GetProductCta";
import axios from 'axios';
import { getStripe } from "@/libs/stripe";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import ProductReview from "@/components/ProductReview/ProductReview";



const ProductDetails = (props: { params: { _id: string } }) => {
    let isBought :boolean;
    const { params: {_id} } = props;
    console.log(_id);
    const { data: session } = useSession();
    const fetchProdcut = async () => {
        return getProduct(_id);
    }
    const { data: product, error, isLoading } = useSWR('/api/product', fetchProdcut);
    const fetchOrder = async () => {
            if(session)
                return await getOrder(session.user.id,_id);
            else return null;
            }
    const {data:check} = useSWR('/api/order',fetchOrder,{
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        revalidateOnMount:true,
        refreshInterval:1000 
            });
    console.log(check);
        if(check) {
            isBought=true;
            console.log(isBought)
                }
        else{
            isBought=false;
            console.log(isBought);
        }
    const handleBuyNowClick = async () => {
        const stripe = await getStripe();
        try {
            if (product) {
                if(check){
                    await axios.get(`/products/${_id}`);
                }
                console.log(product._id);
                const { data: stripeSession } = await axios.post('/api/stripe', { productId: product._id })
                if (stripe) {
                    const result = await stripe.redirectToCheckout({
                        sessionId: stripeSession.id
                    })
                    if (result.error) {
                        toast('Payment failed!')
                    }

                }
            }
        }
        catch (error) {
            console.log('error', error);
            toast('An error occured!')
        }
    }
    if (error) throw new Error('cannot fetch data');
    if (typeof product === 'undefined' && !isLoading) { throw new Error('cannot fetch data'); }
    if (!product) return <LoadingSpinner />
    return (
        <div>
            <ProductPhotoGallery photos={product.images} />
            <div className="container mx-auto mt-20">
                <div className="md:grid md:grid-cols-12 gap-10 px-3">
                    <div className="md:col-span-8 md:w-full">
                        {/*Product infos */}
                        <div>
                            <h2 className="font-bold text-left text-lg md:text-2xl ">
                                {product.name}
                            </h2>
                            <div className="flex my-11">
                                <div className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center">
                                    <i className="fa-solid fa-file-pdf text-2xl"></i>
                                    <p className="text-xs md:text-base pt-3">Pdf format</p>
                                </div>
                                <div className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center">
                                    <i className="fa-regular fa-file-image text-2xl"></i>
                                    <p className="text-xs md:text-base pt-3">Image files</p>
                                </div>
                                <div className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center">
                                    <i className="fa-solid fa-ranking-star text-2xl"></i>
                                    <p className="text-xs md:text-base pt-3">Best Seller</p>
                                </div>
                            </div>
                            <div className="mb-11">
                                <h2 className="font-bold text-3xl mb-2">
                                    Description
                                </h2>

                                <p>
                                    {product.description}
                                </p>
                            </div>

                            <div className="shadow dark:shadow-white rounded-lg p-6">
                                <div className="items-center mb-4">
                                    <p className="md:text-lg font-semibold ">Customer Reviews</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Reviews*/}
                                    <ProductReview productId={product._id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow-white sticky top-10 h-fit overflow-auto">
                        <GetProductCta discount={product.discount} price={product.price} specialNote={product.specialNote} isBought={isBought} handleBuyNowClick={handleBuyNowClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductDetails;