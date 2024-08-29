<script lang="ts">
	import ProductCard from '$lib/components/productCard.svelte';
    import SearchBar from '$lib/components/searchBar.svelte';
	import { createSearchStore } from '$lib/stores/searchProducts';
    import PriceRangePicker from '$lib/components/priceRangePicker.svelte';
	import Layout from '../../+layout.svelte';
	import SearchPageFilters from '$lib/components/searchPageFilters.svelte';
    export let data;
    console.log(data.products)

    const searchStore = createSearchStore(data.products)





</script>

<div class="search-results-page m-10">
    <div class="search-results-page-top flex">
        <div class="logo w-1/6"></div>
        <div class="w-1/2">
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
    <button>
        Next Page
    </button>

</div>





