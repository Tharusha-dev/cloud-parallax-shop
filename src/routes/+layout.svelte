<script>
	import { navigating } from "$app/stores";
	import LoadingOverlay from "$lib/components/loadingOverlay.svelte";
    import "../app.css";
</script>
<LoadingOverlay visible={$navigating !== null} />
<slot />

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>