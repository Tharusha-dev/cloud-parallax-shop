<script>
// @ts-nocheck

	import { onMount } from "svelte";

    export let searchStore;
	import PriceRangePicker from "./priceRangePicker.svelte";

    let filterPriceMax;
    let filterPriceMin;
    let filterCatogory;
    let catogoriesDone = false;
    let selectedCatogories = []

    let productCatogories = new Set([]);

    searchStore.subscribe((data)=>{
        productCatogories.clear()
        findCatogories(data.allProducts)

    })

    function findCatogories(products){
     
        products.forEach((product)=>{
            productCatogories.add(product.category)
        })
        selectedCatogories = [...productCatogories]
        console.log(productCatogories)
        catogoriesDone = true;

    }

    onMount(()=>{
        findCatogories($searchStore.allProducts)


    })



    function filterProductByPrice(product){
        console.log(filterPriceMax)
        return product.price > filterPriceMin && product.price < filterPriceMax;

    }

    function filterProductByCatogory(product){
        console.log(filterCatogory)

        return selectedCatogories.includes(product.category)

    }

</script>
<div class="search-page-filters">
   

    <PriceRangePicker bind:rangeInputMax={filterPriceMax} bind:rangeInputMin={filterPriceMin}/>

    {#if catogoriesDone}

     
    <div class="filter-catogories flex flex-col">
        {#each productCatogories as catogory (catogory)}
        <div class="filter-catogory" >
            <label for="">{catogory}</label>
            <input type="checkbox" bind:group={selectedCatogories} name="" id="" value={catogory} />
        </div>
        
    {/each}
  
    </div>
    
    {/if}


    <button on:click={()=>{
        searchStore.update(data => ({
            ...data,
            filteredProducts: data.allProducts.filter(filterProductByPrice)
        }))

        searchStore.update(data => ({
            ...data,
            filteredProducts: data.filteredProducts.filter(filterProductByCatogory)
        }))

        console.log(selectedCatogories)




    }}>Apply</button>
</div>