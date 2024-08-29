import axios from 'axios';
import type { PageLoad } from './$types';

 let catogories = []

 async function getProductsForLandingPage() {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching product categories:', error);
    }
}


// beauty furniture fragrances groceries home-decoration kitchen-accessories



export const load: PageLoad = async ({ params }) => {

    


	return {
        catogories : await getProductsForLandingPage(),
		post: {
			title: `Title for goes here`,
			content: `Content for goes here`,
		},
	};
};