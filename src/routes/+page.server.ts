import axios from 'axios';
import type { PageLoad } from './$types';
import type { Catogory } from '$lib/types/types';


type LoadParams = {
    slug: string;
 
  };
  
type LoadReturn = {
    categoried : Catogory[]
};
  
 let catogories:Catogory[] = []

 async function getProductsForLandingPage() {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching product categories:', error);
    }
}


// beauty furniture fragrances groceries home-decoration kitchen-accessories



export const load: PageLoad<LoadParams, LoadReturn> = async ({ params }) => {

    


	return {
        categories : await getProductsForLandingPage(),
	
	};
};