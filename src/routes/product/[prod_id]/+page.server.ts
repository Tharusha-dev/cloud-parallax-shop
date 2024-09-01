import type { PageLoad } from './$types';
import type { Product } from '$lib/types/types';
import axios from 'axios';



const productLimit = 10;

async function getProductData(prodId:string){
 
    try {
        const productResponse = await axios.get(`https://dummyjson.com/products/${prodId}`);
        console.log(productResponse)
        return productResponse.data
        
    } catch (error) {
        console.error('Error fetching products:', error);
        return []
    }
}




export async function load({ params }) {
    const { prod_id } = params;

    return {
        productData : await getProductData(prod_id),
   
    };
}