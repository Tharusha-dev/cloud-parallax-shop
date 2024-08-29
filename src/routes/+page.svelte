<script>
    export let data
    import ProductCatogoryCard from '$lib/components/productCatogoryCard.svelte'
    import SearchBar from '$lib/components/searchBar.svelte';
    console.log(data.catogories)
</script>

<div class="landing-page flex flex-col items-center justify-center">
    
    <div class="landing-page-search w-1/2">
        <SearchBar data={{
            value:"",
            placeholder:"Search for a product"
        }}/>
    </div>

    <div class="grid grid-cols-2 gap-5 mx-10 w-full h-1/4">
        {#each data.catogories as catogory}
    
            <ProductCatogoryCard  data={catogory}/>
    
        {/each}
        
    </div>
    
</div>

