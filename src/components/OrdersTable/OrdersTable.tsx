'use client';

import { getProduct } from "@/libs/apis";
import { Order } from "@/models/order";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
    orderDetails:Order[];
    setProductId : Dispatch<SetStateAction<string | null>>;
    toggleRatingModal: () =>void;
 
}
const OrdersTable:FC<Props> = ({orderDetails,setProductId,toggleRatingModal}) => {
    const router = useRouter()
  return (
    <div className="overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="px-6 py-3">
                            Product
                    </th>
                    <th className="px-6 py-3">
                            Price
                    </th>
                    <th className="px-6 py-3">
                            Date
                    </th>
                    <th className="px-6 py-3">

                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    orderDetails.map(async (order) => { return (
                        <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                            <th onClick={()=> router.push(`/products/${order.digitalProduct._id}`)} className="px-6 underline text-blue-600 cursor-pointer py-4 font-medium whitespace-nowrap">
                                
                                {order.digitalProduct.name}
                            </th>
                            <td className="px-6 py-4">
                                {order.totalPrice}
                            </td>
                              <td className="px-6 py-4">
                                {order.orderDate}
                            </td>
                            <td className="px-6 py-4">
                                <button className="font-medium text-blue-600 hover:underline"
                                onClick={()=> {setProductId(order.digitalProduct._id);
                                                toggleRatingModal();
                                               
                                                }}>
                                    Rate this product
                                </button>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table>

    </div>
  )
}

export default OrdersTable