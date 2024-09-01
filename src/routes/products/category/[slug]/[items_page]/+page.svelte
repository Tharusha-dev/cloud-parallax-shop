<script lang="ts">

    export let data;
    import ProductsPage from '$lib/views/productsPage.svelte';

    let nextPageNumber:number|undefined;

</script>

<ProductsPage data={data} bind:nextPageNumber={nextPageNumber}/>

<div class="page-controls pl-[25vw] mt-10 flex w-max justify-between">


    {#if nextPageNumber && nextPageNumber > 2}
    
    
    
    
    
    <a href={`/products/category/${data.slug}/${nextPageNumber-2}`}>
        <div class="bg-gray-300 p-2">
            Previous Page
        </div>
    </a>
    
    {/if}
    
    
    <a href={`/products/category/${data.slug}/${nextPageNumber}`} class="ml-8">
        <div class="bg-gray-300 p-2">
            Next Page
        </div>
    </a>
</div>