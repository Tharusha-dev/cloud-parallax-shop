<script>
    export let product;
</script>

<div class="product-card flex flex-col items-center border border-gray-200 rounded-lg shadow dark:bg-gray-300 dark:hover:bg-gray-700">
        
    <img class="w-full h-auto object-cover rounded-t" src={product.thumbnail} alt={product.name} loading="lazy">
   .
    <div class="p-4 w-full">
    
      <h3 class="text-lg font-semibold">{product.title}</h3>
      <p class="text-sm text-gray-600">${product.price}</p>
    </div>
</div>