'use client';
import {ChangeEvent, FC} from 'react';
import{ useRouter } from 'next/navigation';
type Props = {
    productTypeFilter:string;
    searchQuery : string;
    setProductTypeFilter : (value:string) => void;
    setSearchQuery : (value:string) => void;
}
const Search : FC <Props>= ({productTypeFilter,searchQuery,setProductTypeFilter,setSearchQuery}) => {
    const router = useRouter()
    const handleProductTypeChange = (event :ChangeEvent<HTMLSelectElement>) =>{
        setProductTypeFilter(event.target.value);
    };

    const handleSearchQuery = (event : ChangeEvent<HTMLInputElement>) =>{
        setSearchQuery(event.target.value);
    }
    const handleFilterClick = () => {
        router.push(`/products?productType=${productTypeFilter}&searchQuery=${searchQuery}`)
    }
    return (
    <section className="bg-tertiary-light px-4 py-6 rounded-lg">
        <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
            <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
                <label className="block text-sm font-medium mb-2 text-black">
                    Product type:
                </label>
                <div className="relative">
                        <select className="w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none"
                        value={productTypeFilter}
                        onChange={handleProductTypeChange}
                        >
                            <option value="All">All</option>
                            <option value="Calenders">Calenders</option>
                            <option value="Planners">Planners</option>
                            <option value="Freebies">Freebies</option>
                        </select>
                </div>
            </div>
            <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
                <label className="block text-sm font-medium mb-2 text-black">
                    Search
                </label>
                <input type="search" 
                        id="search"
                        placeholder="Search..."
                        className="w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white"
                        value={searchQuery}
                        onChange={handleSearchQuery}
                />
            </div>
            <button 
            className="btn-primary" 
            type='button' 
            onClick={handleFilterClick}
            >
                Search
            </button>
        </div>
    </section>
  )
}

export default Search