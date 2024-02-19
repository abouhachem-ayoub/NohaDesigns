"use client"
import ProductCard from "@/components/ProductCard/ProductCard";
import Search from "@/components/Search/Search";
import { getProducts } from "@/libs/apis";
import { Product } from "@/models/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from 'swr';

const Products = () => {
    const [productTypeFilter,setProductTypeFilter] = useState('');
    const [searchQuery,setSearchQuery] = useState('');
    const searchParams = useSearchParams()
    useEffect(()=>{
        const searchQuery = searchParams.get("searchQuery");
        const productType = searchParams.get("productType");
        if(searchQuery) setSearchQuery(searchQuery);
        if(productType) setProductTypeFilter(productType);

    },[]);
    async function fetchData(){
        return getProducts();
    }
    const {data,error,isLoading} = useSWR('get/products',fetchData);
    if(error) throw new Error('cannot fetch data');
    if(typeof data === 'undefined' && !isLoading)
    throw new Error('cannot fetch data');
    function filterProducts(products: Product[]){
            return products.filter((product) =>{
                if(productTypeFilter && productTypeFilter.toLowerCase()!=="all" && product.type.toLowerCase()!==productTypeFilter.toLowerCase())
                    {   
                    return false;
                }
                if(searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    { 
                    return false;
                }
                return true;
            })
    }
    const filteredProducts = filterProducts(data||[]);
    console.log(filteredProducts);
  return (
    <div className="container mx-auto pt-10">
        <Search productTypeFilter={productTypeFilter} searchQuery={searchQuery} setProductTypeFilter={setProductTypeFilter} setSearchQuery={setSearchQuery}/>
        <div className="flex mt-20 justify-between flex-wrap">
            {filteredProducts.map( room => {
                return(
                    <ProductCard key={room._id} product={room}/>
                )
            })}
        </div>
    </div>
        )
}
export default Products;