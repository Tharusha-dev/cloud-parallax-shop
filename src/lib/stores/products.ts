import type { Product, ProductStore } from "$lib/types/types"
import { writable } from "svelte/store"





export function createProductsStore(products:Product[]){
	const { subscribe, set, update } = writable(<ProductStore>{
		allProducts: products,
		filteredProducts: products,
		
	})

	return {
		subscribe,
		set,
		update,
	}
}

