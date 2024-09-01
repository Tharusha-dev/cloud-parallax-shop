import type { PageLoad } from './$types';
import type { Product } from '$lib/types/types';
import axios from 'axios';



const productLimit = 10;

type LoadParams = {
    slug: string;
    items_page: string;
  };
  
type LoadReturn = {
    slug: string;
    products: Product[]; 
    items_page: string;
};
  



async function getProductsFromSearchTerm(term:string,page:string){

    let products:Product[] = [];
    let pageNum = parseInt(page) -1
 
    try {
        const productResponse = await axios.get(`https://dummyjson.com/products/search?q=${term}&limit=${productLimit}&skip=${pageNum*productLimit}`);
        
        productResponse.data.products.forEach((product: Product) => {
            products.push(product);
        });

        console.log(products.length)

        return products

        
    } catch (error) {
        console.error('Error fetching products:', error);
        return []
    }
}




export const load: PageLoad<LoadParams, LoadReturn> = async ({ params }) => {
    const { slug, items_page } = params;
  
    return {
      slug,
      products: await getProductsFromSearchTerm(slug, items_page),
      items_page,
    };
  };