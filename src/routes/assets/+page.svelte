<script lang="ts">
	import type { PageData } from "./$types"
	import Bar from "$lib/components/AdminBar.svelte"
	import AssetCard from "$lib/components/AssetCard.svelte"

	export let data: PageData
</script>

{#if data.admin}
	<Bar>
		<form style="display='contents';" method="POST" action="?/create">
			<button type="submit" class="app-button">Create</button>
		</form>
	</Bar>
{/if}

<div class="cards">
	{#each data.assets as asset}
		<AssetCard href="/assets/{asset.id}" image={asset.image ? `store/${asset.id}/${asset.image}` : null}>
			<h1>{asset.name}</h1>
			<p>Tag: {asset.tag ? asset.tag : "No tag"}</p>
			<p>Location: {asset.location ? asset.location.name : "No location"}</p>
			<div>
				<span>Categories:</span>
				{#if asset.categories}
					{#each asset.categories as category}
						<span>{category.name}</span>
					{/each}
				{:else}
					<span>No categories</span>
				{/if}
			</div>
		</AssetCard>
	{:else}
		<span>No assets</span>
	{/each}
</div>

<style>
	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		word-break: break-all;
	}
</style>
