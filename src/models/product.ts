type CoverImage = {
    url : string;
}

export type Image = {
    _key : string;
    url: string;

}

export type Product = {
    _id: string;
    coverImage : CoverImage;
    description:string;
    discount: number;
    images : Image[];
    isFeatured:boolean;
    name:string;
    price:number;
    slug:string;
    specialNote:string;
    type:string;
}

export type CreateOrderDto = {
    user:string;
    product:string;
    orderDate:string;
    totalPrice : number;
}