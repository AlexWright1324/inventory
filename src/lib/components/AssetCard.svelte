<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, href, image }: { children: Snippet; href: string; image: string | null } = $props();
</script>

<a {href} class="card">
	{#if image}
		<section style="background-image: url({image});" class="image"></section>
	{:else}
		<section class="image"></section>
	{/if}
	<article class="content">
		{@render children()}
	</article>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: inherit;
		width: 350px;
		height: 500px;
		background-color: var(--app-background-color-2);
		--radius: 10px;
		border-radius: var(--radius);
		box-shadow: var(--app-shadow);
		transition: transform 150ms ease-in-out;

		&:hover {
			transform: scale(1.01);
		}
	}
	.image {
		width: 100%;
		height: 200px;
		background-size: cover;
		background-position: center;
		overflow: hidden;

		border-radius: var(--radius) var(--radius) 0 0;
	}
	.content {
		flex: 1;
		padding: 1rem;
		border-top: 2px solid hsla(0, 0%, 100%, 0.075);
		overflow: hidden;
	}
</style>
