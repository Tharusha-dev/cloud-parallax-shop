<script lang="ts">

    export let data;
	import type { Product } from '$lib/types/types.js';
   import Carousel from 'svelte-carousel'
   import { browser } from '$app/environment';
   import { register } from 'swiper/element/bundle';
	import { onMount } from 'svelte';


    let productsData:Product = data.productData;


  

  let carousel; // for calling methods of the carousel instance
  const handleNextClick = () => {
    carousel.goToNext();
  };

  onMount(()=>{
    register();
  })





</script>

<div class="product-page px-8 py-8 h-screen lg:grid lg:grid-cols-2 sm:flex sm:flex-col dark:bg-slate-100">

    <div class="prod-image-outer lg:h-full sm:h-1/2 mb-8 border-gray-200 rounded-lg shadow dark:bg-gray-200">
      <swiper-container class="mySwiper" navigation="true">
        {#each productsData.images as src}
        <swiper-slide><img src={src} alt="" style="width: auto; height: 60vh;"></swiper-slide>
        {/each}
      
       
      </swiper-container>

   
    </div>

    <div class="product-info lg:ml-8">
        <h1 class="text-6xl">{productsData.title}</h1>
        <p class="text-xl">{productsData.description}</p>
        <h2 class="text-3xl">${productsData.price}</h2>

        <div class="rating h-10 flex justify-start items-center">
            <svg class="h-[80%]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#dbd400"></path> </g></svg>
            <span class="text-xl">{productsData.rating}</span>
            
        </div>

        <table class="bg-white w-full">
            <tr class="border-black">
                <td class="border-black  border-2">Brand</td>
                <td class="border-black  border-2" >{productsData.brand}</td>

            </tr>
            <tr class="border-black">
                <td class="border-black  border-2">Category</td>
                <td class="border-black  border-2" >{productsData.category}</td>

            </tr>
            <tr class="border-black">
                <td class="border-black  border-2">Weight</td>
                <td class="border-black  border-2" >{productsData.weight}</td>

            </tr>
        </table>
    </div>

    

</div>

<style>
      swiper-container {
      width: 100%;
      height: 100%;
    }

    swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
</style>