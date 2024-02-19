import { groq } from "next-sanity";

export const getFeaturedQuery = groq`*[_type == 'digitalProduct' && isFeatured == true][0]{
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
}`

export const getProductsQuery = groq`*[_type=="digitalProduct"]{
    _id,
    coverImage,
    description,
    isFeatured,
    name,
    price,
    slug,
    type
}`

export const getProductQuery = groq`*[_type=="digitalProduct" && _id == $_id][0]{
    _id,
    coverImage,
    description,
    isFeatured,
    name,
    price,
    slug,
    type,
    images,
    specialNote,
    discount
}`

export const getOrderQuery = groq`*[_type=="order" 
&& user._ref==$user 
&& digitalProduct._ref == $product][0]{
    totalPrice,
}`
export const getOrdersQuery = groq`*[_type=="order" ][0]{
    totalPrice,
}`

export const getUserOrdersQuery = groq`*[_type=='order' && user._ref==$user]{
    _id,
    user->{
        _id,
        name
    },
    digitalProduct->{
        _id,
        name
    },
    orderDate,
    totalPrice
}`

export const getUserDataQuery = groq`*[_type=='user' && _id==$_id][0]{
    _id,
    name,
    email,
    isAdmin,
    _createdAt,
    image,
}`

export const checkReviewExistsQuery = groq`*[_type=='review' && user._ref==$userId && digitalProduct._ref==$productId][0]{
    _id
}`

export const getProductReviewsQuery=groq`*[_type=='review' && digitalProduct._ref==$productId]{
    _createdAt,
    _id,
    user->{name},
    text,
    userRating
}`