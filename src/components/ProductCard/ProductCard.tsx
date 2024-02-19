import { Product } from "@/models/product";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
type Props = {
    product:Product;
}
const ProductCard:FC<Props> = (props) => {
const {product:{coverImage,name,price,type,description,_id}}= props;
  return (
    <div className="rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black ">
        <div className="h-60 overflow-hidden ">
            <Image
            src={coverImage.url}
            alt={name}
            width={250}
            height={250}
            className="img scale-animation"
            />
        </div>
        <div className="p-4 bg-white">
            <div className="flex justify-between text-xl font-semibold ">
                <p>{name}</p>
                <p>${price}</p>
            </div>
           <p className="pt-2 text-xs">
                {type}
           </p>
           <p className="pt-3 pb-6">
            {description.slice(0,100)}...
           </p>
           <Link href={`/products/${_id}`} className="bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500">
            Get it Now!
           </Link>
        </div>
    </div>
  )
}

export default ProductCard;