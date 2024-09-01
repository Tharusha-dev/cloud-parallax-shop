<script>
    export let productsStore;
    
    import ProductCard from "./productCard.svelte";


</script>

<div class="search-products grid w-full max-h-full lg:grid-cols-5 grid-cols-50-50 gap-4 bg-white rounded-t col-span-4">
    {#each $productsStore.filteredProducts as product}
    
    <ProductCard  product={product}/>
    

    {/each}
   

</div>