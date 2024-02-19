import { defineField } from "sanity";

const order = {
    name:'order',
    title:'Order',
    type:'document',
    fields:[
        defineField({
            name:'user',
            title:'User',
            type:'reference',
            to:[{type:'user'}],
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:'digitalProduct',
            title:'Digital Product',
            type:'reference',
            to:[{type:'digitalProduct'}],
            validation:Rule=>Rule.required(),  
        }),
        defineField({
            name:"orderDate",
            title:"Order date",
            type:'date',
            validation:Rule=>Rule.required(),
        }),
        defineField({
            name:'totalPrice',
            title:'Total price',
            type:'number',
            validation:Rule=>Rule.required().min(0)
        })
    ]
}
export default order;