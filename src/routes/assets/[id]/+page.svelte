<script lang="ts">
	import { page } from '$app/stores';
	import { Carta, Markdown } from 'carta-md';
	import DOMPurify from 'isomorphic-dompurify';
	import 'carta-md/default.css';

	const asset = $page.data.asset;
	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	import Bar from '$lib/components/AdminBar.svelte';
</script>

<div>
	{#if $page.data.admin}
		<Bar>
			<a class="app-button" href="/assets/{asset.id}/edit">Edit</a>
			<form style="display: contents;" method="POST" action="?/delete">
				<input type="hidden" name="id" value={asset.id} />
				<button class="app-button" type="submit">Delete</button>
			</form>
		</Bar>
	{/if}
	<h1>{asset.name}</h1>
	<span>Tag: {asset.tag}</span>

	{#if asset.categories}
		{#each asset.categories as category}
			{category.name}
		{/each}
	{/if}
</div>

<Markdown {carta} value={asset.description} />
