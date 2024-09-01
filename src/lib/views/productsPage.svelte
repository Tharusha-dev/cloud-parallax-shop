<script lang="ts">
    //@ts-nocheck
	import ProductCard from '$lib/components/productCard.svelte';
    import SearchBar from '$lib/components/searchBar.svelte';
    import { createProductsStore } from '$lib/stores/products.js';
    import { afterNavigate } from '$app/navigation';
    import PriceRangePicker from '$lib/components/priceRangePicker.svelte';
	import ProductFilters from '$lib/components/productFilters.svelte';
    import ProductsGrid from '$lib/components/productsGrid.svelte';
    export let data;
 
    let products = []
    const productsStore = createProductsStore(products)
    let smallScreenFilterOpen = false;

  
   

    $: productsStore.set({
        allProducts : data.products,
        filteredProducts : data.products
    }) 




    export let nextPageNumber = parseInt(data.items_page) + 1
    let isSmallScreen = false;


    // data.item_page is updated, but not nextPageNumber. 
    // see https://stackoverflow.com/questions/77665039/state-not-updating-in-sveltekit

    $: nextPageNumber = parseInt(data.items_page) + 1
  
    let innerWidth;
    let innerHeight;
    
    $: isSmallScreen = innerWidth < 640; 
    $: console.log(innerWidth)
  




</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="search-results-page p-10 h-max w-full lg:h-screen">
    <div class="search-results-page-top flex flex-col lg:flex-row h-[10%]">
        <div class="logo w-full lg:w-1/6">
            <a href="/">
                <h1 class="text-4xl font-semibold">A Simple Shop</h1>
                <span>By Tharusha</span>
            </a>
         
        </div>

        <div class="search-filter-outer w-full h-3/4 lg:w-1/2 flex">
            {#if isSmallScreen}
            <svg on:click={()=>{smallScreenFilterOpen = !smallScreenFilterOpen}} class="w-1/12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V6.17157C22 6.96722 21.6839 7.73028 21.1213 8.29289L15.2929 14.1213C15.1054 14.3089 15 14.5632 15 14.8284V17.1716C15 17.9672 14.6839 18.7303 14.1213 19.2929L11.9193 21.4949C10.842 22.5722 9 21.8092 9 20.2857V14.8284C9 14.5632 8.89464 14.3089 8.70711 14.1213L2.87868 8.29289C2.31607 7.73028 2 6.96722 2 6.17157V5Z" fill="#323232"></path> </g></svg>
            {/if}
            <div class="w-full flex items-center">
                <SearchBar data={
                    {placeholder:"",value:data.slug}
                }/>
            </div>
    
        </div>

        
        
    </div>

    {#if smallScreenFilterOpen}

    <div class="small-screen-filters w-10/12 fixed inset-0 flex items-center justify-center bg-white">
        <div class="bg-white p-6 rounded-lg shadow-lg z-50">
            <button
        on:click={()=>{smallScreenFilterOpen = false}}
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ProductFilters productStore={productsStore}/>
        </div>
       
    </div>

    {/if}

    <div class="search-result lg:flex max-h-full">
        {#if !isSmallScreen}

        <div class="filters-container w-1/6 mx-3" >
        
            <ProductFilters productStore={productsStore}/>
        </div>

        {/if}
        <ProductsGrid productsStore={productsStore}/>

    
    
    </div>


 </div>