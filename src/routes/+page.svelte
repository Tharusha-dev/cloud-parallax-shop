<script>
    export let data
    import ProductCatogoryCard from '$lib/components/productCatogoryCard.svelte'
    import SearchBar from '$lib/components/searchBar.svelte';
   
</script>

<div class="landing-page flex flex-col items-center justify-center">
    
    <div class="landing-page-search w-9/12 h-[5vh]">
        <SearchBar data={{
            value:"",
            placeholder:"Search for a product"
        }}/>
    </div>

    <a href="/products/all/1">
        <div class="browse-all-outer mt-10">
            <div class="button bg-white p-3 rounded-md cursor-pointer">Browse all products</div>
        </div>
    </a>
    <div class="grid grid-cols-4 gap-x-4 gap-y-14 px-10 my-10 w-full h-1/4">

            {#each data.categories as category}
        
                <ProductCatogoryCard  data={category}/>
        
            {/each}
       
        
    </div>
    
</div>

