<script lang='ts'>
	  import { onMount } from "svelte";
    import ProductCard from "$lib/components/productCard.svelte"
  	import type { Product } from "$lib/types/types";

	import axios from "axios";


    export let data;


    let products:Product[] = []

    let isLoading = true;
    let imageLoaded = false;


    function handleImageLoad() {
    imageLoaded = true;
  }

  // Reset imageLoaded when the product changes
  $: {
    imageLoaded = false;
  }


    async function getProductsFromCatogory(slug:string){
        try {
            let productsResponse = await axios.get(`https://dummyjson.com/products/category/${slug}?limit=4`);

        productsResponse.data.products.forEach((product: Product) => {
            products.push(product);
        });

        isLoading = false;


     
        }catch(error){
          console.error('Error fetching products:', error);
        
        }
    }

    onMount(()=>{
        getProductsFromCatogory(data.slug)
    })

</script>



<div class="product-category-card grid grid-cols-2 gap-4 bg-white rounded-lg w-full h-full place-self-cente p-4">
    
    
    {#if !isLoading}
    <div class="col-span-full">
        <h2 class="text-xl font-semibold">{data.name}</h2>
      </div>
      {#each products as product}
      <ProductCard product={product} />
      {/each}

    <a href='/products/category/{data.slug}/1' class="font-medium">Browser more</a>


    {/if}





  </div>

  <style>

.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
}
.loader::before,
.loader::after {    
  content:"";
  grid-area: 1/1;
  --c:no-repeat radial-gradient(farthest-side,#25b09b 92%,#0000);
  background: 
    var(--c) 50%  0, 
    var(--c) 50%  100%, 
    var(--c) 100% 50%, 
    var(--c) 0    50%;
  background-size: 12px 12px;
  animation: l12 1s infinite;
}
.loader::before {
  margin: 4px;
  filter: hue-rotate(45deg);
  background-size: 8px 8px;
  animation-timing-function: linear
}

@keyframes l12 { 
  100%{transform: rotate(.5turn)}
}
  </style>