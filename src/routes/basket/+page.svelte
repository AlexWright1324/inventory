<script>
	import { basket } from "$lib/client/basket"
</script>

<h1>Basket</h1>

{#each $basket as item}
    <p>{item.id}</p>
{/each}