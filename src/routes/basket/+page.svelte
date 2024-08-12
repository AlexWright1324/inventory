<script>
	import { Basket } from "$lib/client/basket"

    let basket = Basket()
</script>

<h1>Basket</h1>

{#each $basket as item}
    <p>{item.id}</p>
{/each}