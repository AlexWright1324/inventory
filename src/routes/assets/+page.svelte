<script lang="ts">
	import { page } from '$app/stores';
	import Bar from '$lib/components/AdminBar.svelte';
	import AssetCard from '$lib/components/AssetCard.svelte';

	const getImage = (id: number, image: string | null) => {
		if (image) return `/store/${id}/${image}`;
		return null;
	};
</script>

{#if $page.data.admin}
	<Bar>
		<form style="display='contents';" method="POST" action="?/create">
			<button type="submit" class="app-button">Create</button>
		</form>
	</Bar>
{/if}

<div class="cards">
	{#each $page.data.assets as asset}
		<AssetCard href="/assets/{asset.id}" image={getImage(asset.id, asset.image)}>
			<h1>{asset.name}</h1>
			<p>Tag: {asset.tag ? asset.tag : 'No tag'}</p>
			<p>Location: {asset.location ? asset.location : 'No location'}</p>
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
			{JSON.stringify(asset)}
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
