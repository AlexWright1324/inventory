<script lang="ts">
	import { Basket } from "$lib/client/basket"

	const onSubmit = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const data = new FormData(event.currentTarget)

		const quantity = Number(data.get("quantity"))

		if (isNaN(quantity)) return

		basket.editItem(id, quantity)
	}

	let basket = Basket()
	let { id }: { id: string } = $props()
    
    let initialQuantity = basket.getQuantity(id, $basket)
</script>

<div>
	<form onsubmit={onSubmit}>
		<input type="number" name="quantity" min="1" value={initialQuantity} required />
		{#if basket.itemPresent(id, $basket)}
            <button class="app-button" type="submit">Change quantity</button>
			<button class="app-button" onclick={() => basket.removeItem(id)}>Remove from basket</button>
		{:else}
			<button class="app-button" type="submit">Add to basket</button>
		{/if}
	</form>
</div>
