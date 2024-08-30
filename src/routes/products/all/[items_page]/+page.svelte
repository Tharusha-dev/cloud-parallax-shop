<script lang="ts">
    //@ts-nocheck
	import ProductCard from '$lib/components/productCard.svelte';
    import SearchBar from '$lib/components/searchBar.svelte';
	import { createSearchStore } from '$lib/stores/searchProducts';
    import { afterNavigate } from '$app/navigation';
    import PriceRangePicker from '$lib/components/priceRangePicker.svelte';
	
	import SearchPageFilters from '$lib/components/searchPageFilters.svelte';
    export let data;
 
    let products = []
    const searchStore = createSearchStore(products)


    // This is a thing you HAVE to do in svelte, if i want to make this work. svelte just straight up wont update the page when routing to a different page in the same route. 
    // see https://github.com/sveltejs/kit/issues/3506 
    
   

    $: searchStore.set({
        allProducts : data.products,
        filteredProducts : data.products
    }) 




    let nextPageNumber = parseInt(data.items_page) + 1


    // same kind of issue as before. data.item_page is updated, but not nextPageNumber. 
    // see https://stackoverflow.com/questions/77665039/state-not-updating-in-sveltekit

    $: nextPageNumber = parseInt(data.items_page) + 1
  





</script>

<div class="search-results-page m-10 h-screen">
    <div class="search-results-page-top flex h-[5%]">
        <div class="logo w-1/6"></div>
        <div class="w-1/2 ">
            <SearchBar data={
                {placeholder:"",value:data.slug}
            }/>
        </div>
    </div>
    <div class="search-result flex">
        <div class="filters-container w-1/6 mx-3" >
        
            <SearchPageFilters searchStore={searchStore}/>
        </div>
        <div class="search-products grid grid-cols-4 gap-4 bg-white rounded-t col-span-4">
            {#each $searchStore.filteredProducts as product}
            
            <ProductCard  product={product}/>
            

            {/each}
           
        
        </div>
    
    
    </div>

    {#if nextPageNumber > 2}

    <a href={`/products/all/${nextPageNumber-2}`}>
        Previous Page
    </a>

    {/if}


    <a href={`/products/all/${nextPageNumber}`}>
        Next Page
    </a>

 

</div>





