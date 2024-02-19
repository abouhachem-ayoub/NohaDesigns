import { defineField } from "sanity";

const productTypes = [
    {title:'Planners',value:'planners'},
    {title:'Calenders', value :'calenders'},
    {title:'Wall art',value:'wallArt'}
]
const digitalProduct = {
        name:'digitalProduct',
        title:'Digital Product',
        type:'document',
        fields:[
            defineField({
                name:'name',
                title:'Name',
                type:'string',
                validation : Rule=>Rule.required().max(100).error('maximum of 100 characters!')
            }),
            defineField({
                name:'slug',
                title:'Slug',
                type:'string',
                validation:Rule=>Rule.required(),
            }),
            defineField({
                name:'description',
                title:'Description',
                type:'text',
                validation:Rule=>Rule.required().max(250).error('Do not exceed 250 characters!'),
            }),
            defineField({
                name:"price",
                title:'Price',
                type:'number',
            }),
            defineField({
                name:'discount',
                title:'Discount',
                type:'number',
                initialValue:0,
                validation:Rule=>Rule.min(0)
            }),
            defineField({
                name:'images',
                title:'Images',
                type:'array',
                of:[
                    {type:'object',fields:[{name:'url',type:'url',title:'URL'},
                                            {name:'file',type:'file',title:'File'}]
                    }
                ],
                validation:Rule=>Rule.required().min(3).error('At least 3 images are required!'),
            }),
            defineField({
                name:'coverImage',
                title:'Cover image',
                type:'object',
                fields:[
                    {name : 'url',type:'url',title:'URL'},
                    {name:'file',type:'file',title:'File'}
                ],
                validation:Rule=>Rule.required().error('Cover image is required!')
            }),
            defineField({
                name:'type',
                title:'Product type',
                type:'string',
                options:{
                    list:productTypes,
                },
                validation: Rule =>Rule.required(),
                initialValue:'planners',
            }),
            defineField({
                name:'specialNote',
                title:'Special note',
                type:'text',
                validation:Rule=>Rule.required(),
                initialValue:'This is a digital product, no physical product will be delivered!'
            }),
            defineField({
                name:'isFeatured',
                title:"Is Featured",
                type:'boolean',
                initialValue:false
            }),
            defineField({
                name:'reviews',
                title:'Reviews',
                type:'array',
                of:[{type:'review'}]
            })
        ]
}
export default digitalProduct;