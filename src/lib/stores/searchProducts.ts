import { writable } from "svelte/store"



export function createSearchStore(products){
	const { subscribe, set, update } = writable({
		allProducts: products,
		filteredProducts: products,
		
	})

	return {
		subscribe,
		set,
		update,
	}
}

