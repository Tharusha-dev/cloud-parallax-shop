import type {PageLoad}  from'@sveltejs/kit'
import axios from 'axios';
import type {Product} from '$lib/types/types'



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
  



async function getAllProductWPagination(term:string,page:string){
    let products:Product[] = [];
 

    let pageNum = parseInt(page) -1

    try {
        console.log(`https://dummyjson.com/products?limit=${productLimit}&skip=${pageNum*productLimit}`);

        const productsResponse = await axios.get(`https://dummyjson.com/products?limit=${productLimit}&skip=${pageNum*productLimit}`);
        
        productsResponse.data.products.forEach((product: Product) => {
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
      products: await getAllProductWPagination(slug, items_page),
      items_page,
    };
  };