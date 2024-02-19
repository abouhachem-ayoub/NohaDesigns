import { Review } from "@/models/review";
import axios from "axios"
import { FC } from "react"
import useSWR from "swr";
import Rating from "../Rating/Rating";

const ProductReview:FC<{productId:string}> = ({productId}) => {
  const fetchProductReviews = async() =>{
    const {data} = await axios.get<Review[]>(`/api/product-reviews/${productId}`);
    return data;
  }
  const {data:ProductReviews,isLoading,error} = useSWR('/api/product-reviews',fetchProductReviews,{refreshInterval:5000});
  if(error) throw new Error("something went wrong!");
  if(typeof ProductReviews === 'undefined' && !isLoading) throw new Error("something went wrong");
  console.log(ProductReviews)
  return (
    <>
    {ProductReviews ? ProductReviews.map((review :Review) => 
    {
      return(
          <div key={review._id} className="w-fit bg-gray-100 dark:bg-gray-900 p-4 rounded-lg" >
            <div className="font-semibold mb-2 flex ">
                <p>{review.user.name}</p>
                <div className="ml-4 flex items-center text-tertiary-light text-lg">
                  <Rating rating={review.userRating}/>
                </div>
            </div>
            <p>{review.text}</p>          
            </div>
    )}):""}
    </>
  )
}

export default ProductReview