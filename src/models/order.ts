export type Order={
    _id:string;
    user:{
        _id:string;
        name:string;
    };
    digitalProduct:{
        _id:string;
        name:string;
    };
    orderDate :string;
    totalPrice:number;
}