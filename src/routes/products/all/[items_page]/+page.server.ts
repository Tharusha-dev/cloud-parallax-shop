import type { PageLoad } from '../$types';
import axios from 'axios';

type product = {
    id:string,
    title:string,
    price:number,
    thumbnail:string
    category:string,
}


let products:product[] = [];
const productLimit = 10;

async function getAllProductWPagination(term:string,page:string){
    products = []
    let pageNum = parseInt(page) -1
    try {
        console.log(`https://dummyjson.com/products?limit=${productLimit}&skip=${pageNum*productLimit}`);

        const response = await axios.get(`https://dummyjson.com/products?limit=${productLimit}&skip=${pageNum*productLimit}`);
        
        response.data.products.forEach((product: any) => {
            products.push({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                category: product.category
            });
        });

        console.log(products.length)

        return products

        
    } catch (error) {
        console.error('Error fetching products:', error);
        return []
    }
}




export async function load({ params }) {
    const { slug, items_page } = params;

    const tes = await getAllProductWPagination(params.slug,items_page);


    

    return {
        slug : slug,
        products : await getAllProductWPagination(params.slug,items_page),
        items_page : items_page
    };
}