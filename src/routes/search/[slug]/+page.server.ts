import type { PageLoad } from './$types';
import axios from 'axios';

type product = {
    id:string,
    title:string,
    price:number,
    thumbnail:string
    category:string,
}


let products:product[] = []

async function getProductsFromSearchTerm(term:string){
    products = []
    try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${term}`);
        
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


export const load: PageLoad = async ({ params }) => {

    

	return {
        slug : params.slug,
        products : await getProductsFromSearchTerm(params.slug)
	};
};