<script lang="ts">
	import {  onMount } from "svelte";
    import axios from "axios";

    export let productStore;
	import PriceRangePicker from "./priceRangePicker.svelte";
	import { afterNavigate } from "$app/navigation";
	import type { Catogory, Product, ProductStore } from "$lib/types/types";

    let filterPriceMax: number | undefined;
    let filterPriceMin: number | undefined;

    let catogoriesDone = false;
    let selectedCatogories:String[] = []

    let productCatogories = new Set<String>([]);
    let allCatogories: Catogory[] = []
    let allCatogoriesGot = false;

  // This is a thing you HAVE to do in svelte, if i want to make this work. svelte just straight up wont update the page when routing to a different page in the same route. 
    // see https://github.com/sveltejs/kit/issues/3506 
    
    afterNavigate(()=>{
        selectedCatogories = [...productCatogories]

    })

    productStore.subscribe((data:ProductStore)=>{


        productCatogories.clear()
        findCatogories(data.allProducts)

       
    })

    function findCatogories(products:Product[]){
     
        products.forEach((product)=>{
            productCatogories.add(product.category)
        })
        console.log(productCatogories)
        catogoriesDone = true;

    }

    async function getAllCatogories(){
    
    try {
        const productCatogoriesResponse = await axios.get('https://dummyjson.com/products/categories');
        productCatogoriesResponse.data.forEach((catogory: Catogory)=>{
            allCatogories.push(catogory)
        })

        allCatogoriesGot = true;
    }catch (error) {
        console.error('Error fetching catogories:', error);
        return []
    }

    console.log(allCatogories)

}

    onMount(()=>{

        findCatogories($productStore.allProducts)
        getAllCatogories()


    })



    function filterProductByPrice(product:Product):boolean{
        console.log(filterPriceMax)
        return product.price > filterPriceMin! && product.price < filterPriceMax!;

    }

    function filterProductByCatogory(product:Product):boolean{


        return selectedCatogories.includes(product.category)

    }
    
    </script>


    <div class="search-page-filters">
       
    
        <PriceRangePicker bind:rangeInputMax={filterPriceMax} bind:rangeInputMin={filterPriceMin}/>
    
        {#if catogoriesDone}
    
         
        <div class="all-page-filter-catogories flex flex-col">
            <span>Filter this page</span>
            {#each productCatogories as catogory (catogory)}
            <div class="filter-catogory" >
                <label for="">{catogory}</label>
                <input type="checkbox" bind:group={selectedCatogories} name="" id="" value={catogory} />
            </div>
            
        {/each}
      
        </div>

        {/if}

        <button on:click={()=>{
            productStore.update(data => ({
                ...data,
                filteredProducts: data.allProducts.filter(filterProductByPrice)
            }))
    
            productStore.update(data => ({
                ...data,
                filteredProducts: data.filteredProducts.filter(filterProductByCatogory)
            }))
    
            console.log(selectedCatogories)
    
    
    
    
        }}>Apply</button>

        {#if allCatogoriesGot}

        <div class="filter-categories-links">
            <span>Browse Categories</span>
            <div class="grid grid-cols-2 gap-1">
            {#each allCatogories as catogory (catogory)}
            <a href='/products/category/{catogory.slug}/1' class="filter-catogory p-1 bg-slate-300 rounded-sm" >
                
                <span>{catogory.name}</span>
               
            </a>
            
        {/each}
    </div>
        </div>

        {/if}
        
       
    
    
  
    </div>