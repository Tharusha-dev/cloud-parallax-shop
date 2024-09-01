<script lang="ts">
    import type { Product } from "$lib/types/types";
    export let product:Product;
</script>

<a href='/product/{product.id}' class="product-card flex flex-col items-center border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:hover:bg-gray-700 h-full">
        
    <img class="w-full h-auto object-cover rounded-t" src={product.thumbnail} alt={product.title} loading="lazy">
   .
    <div class="p-4 w-full">
    
      <h3 class="text-lg font-semibold">{product.title}</h3>
      <p class="text-sm text-gray-600">${product.price}</p>
    </div>
  </a>