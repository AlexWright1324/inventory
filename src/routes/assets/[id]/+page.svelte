<script lang="ts">
	import type { PageData } from "./$types"
	import { enhance } from "$app/forms"
	import { Carta, Markdown } from "carta-md"
	import DOMPurify from "isomorphic-dompurify"
	import "carta-md/default.css"

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	})

	import Bar from "$lib/components/AdminBar.svelte"

	export let data: PageData
</script>

{#if data.admin}
	<Bar>
		<a class="app-button" href="/assets/{data.asset.id}/edit">Edit</a>
		<form style="display: contents;" method="POST" action="?/delete" use:enhance>
			<input type="hidden" name="id" value={data.asset.id} />
			<button class="app-button" type="submit">Delete</button>
		</form>
	</Bar>
{/if}

<div class="box">
	<aside>
		<h1>{data.asset.name}</h1>
		<img src={data.asset.image ? `/store/${data.asset.id}/${data.asset.image}` : null} alt={data.asset.name} />
		<ul>
			<li><span>Quantity: {data.asset.quantity}</span></li>
			<li><span>Location: {data.asset.location ? data.asset.location.name : "No location"}</span></li>
			<li><span>Tag: {data.asset.tag}</span></li>
			<li>
				<span>Categories:</span>
				<ul>
					{#each data.asset.categories as category}
						<li>{category.name}</li>
						{:else}
						<li>No categories</li>
					{/each}
				</ul>
			</li>
		</ul>
		<form action="">
			<!-- TODO Change to available quantity -->
			<input type="number" name="quantity" min="1" value="1" max={data.asset.quantity} />
			<button class="app-button" type="submit">Add to Basket</button>
		</form>
	</aside>
	<div class="content">
		<Markdown {carta} value={data.asset.description} />
	</div>
</div>

<style>
	.box {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.5rem;
	}
	img {
		padding: .5rem 0;
		width: 100%;
	}
	aside {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: .5rem;
		width: 300px;
		border: 1px solid var(--app-background-color-2);
		border-radius: .5rem;
	}
	.content {
		flex: 1;
	}
</style>
