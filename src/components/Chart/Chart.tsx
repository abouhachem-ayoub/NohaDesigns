'use client';
import { Order } from '@/models/order';
import {Chart as ChartJS, Tooltip, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { FC } from 'react';
import {Bar} from 'react-chartjs-2';
ChartJS.register(Tooltip,CategoryScale,LinearScale,BarElement);
export const options = {
    responsive:true,
    plugins:{
        legend : {
            position : 'top' as const,
        },
        title:{
            display:true,
            text:'charjs bar chart'
        }
    }
}
const Chart:FC<{userOrders : Order[]}>= ({userOrders}) => {
    const labels = userOrders.map(order => order.digitalProduct.name);
    const amountspent = userOrders.map(order => order.totalPrice);
  return (
    <Bar options={options} data={
            {labels,
            datasets:[
                {
                    label:'amount spent',
                    data:amountspent,
                    borderWidth:1,
                    backgroundColor:'#f27405',
                    hoverBackgroundColor:'#f2c641',
                    
                }
            ]}    
    }/>
  )
}

export default Chart