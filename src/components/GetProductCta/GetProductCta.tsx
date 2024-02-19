'use client';
import {FC} from 'react';
type Props = {
    price:number;
    discount:number;
    specialNote:string;
    isBought:boolean;
    handleBuyNowClick : () => void;
};
const GetProductCta :FC<Props> = (props) => {
    const {price,discount,specialNote,isBought,handleBuyNowClick} = props;
    const discountedPrice = price -(price/100)*discount;
    return (
    <div className="px-7 py-6">
        <h3>
            <span className={`${discount ? "text-gray-400":""} font-bold text-xl`}>
                $ {price}
            </span>
                {discount ? 
                (<span className='font-bold text-lg'>
                {' '}
                | discount {discount}%. Now{' '}  
                <span className='text-tertiary-dark'>$ {discountedPrice}</span>
                 </span>
                )
                 : 
                 ""
                 }
        </h3>
        <div  className='w-full border-b-2 border-b-secondary my-2'/>
        <div className='my-8'>{specialNote}</div>
        <div className='flex'>
            <div className='w-full pr-2'>
                <h4> Upon purchase you will receive :</h4>
                 <p className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
                       <i className="fa-solid fa-plus"></i>  Permannet link to PDF version 
                 </p>
                  <p className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
                       <i className="fa-solid fa-plus"></i>  High quality JPG file for every page
                 </p>
                  <p className='block text-sm font-medium text-gray-900 dark:text-gray-400'>
                       <i className="fa-solid fa-plus"></i>  Editable Doc version
                 </p>
            </div>
        </div>
        <button 
        disabled={isBought}
        onClick={handleBuyNowClick}
        className='btn-primary w-full mt-6 
        disabled:bg-gray-500 disabled:cursor-not-allowed '>
            {isBought? 'Already Bought!' : "Buy it now!"}
        </button>
    </div>
  )
}

export default GetProductCta