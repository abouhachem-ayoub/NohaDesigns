'use client';
import { useState } from "react"
import Search from "../Search/Search"

const PageSearch = () => {
    const [productTypeFilter,setProductTypeFilter] = useState('All');
    const [searchQuery,setSearchQuery] = useState('');
  return (
    <Search
    searchQuery={searchQuery}
    productTypeFilter={productTypeFilter}
    setSearchQuery={setSearchQuery}
    setProductTypeFilter={setProductTypeFilter}
    />
  )
}

export default PageSearch