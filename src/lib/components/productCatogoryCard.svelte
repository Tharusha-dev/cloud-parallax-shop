<script lang='ts'>
	import { onMount } from "svelte";
    import ProductCard from "$lib/components/productCard.svelte"


    export let data;

    type productForCard = {
        id:string,
        title:string,
        price:number,
        thumbnail:string
        
    }

    let products:productForCard[] = []

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
            fetch(`https://dummyjson.com/products/category/${slug}?limit=4`).then((res)=>{res.json().then((productsRes)=>{

                console.log(productsRes)

                productsRes.products.forEach((product)=>{
                    products.push({
                    id:product.id,
                    title:product.title,
                    price:product.price,
                    thumbnail:product.thumbnail,

                })
                })

                isLoading = false;

            
            })})
        }catch(e){

        }
    }

    onMount(()=>{
        getProductsFromCatogory(data.slug)
    })

</script>



<div class="product-category-card grid grid-cols-2 gap-4 bg-white rounded-t w-full">
   
    
    {#if !isLoading}
    <div class="col-span-full">
        <h2>{data.name}</h2>
      </div>
      {#each products as product}
      <ProductCard product={product} />
      {/each}

    <span>Browser more</span>

    <!-- {:else}
    <div class="product-card flex flex-col items-center border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:hover:bg-gray-700">
        <div class="loader w-full h-auto"></div>
        </div> -->
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