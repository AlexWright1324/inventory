<script lang="ts">
	import type { Snippet } from "svelte";
    
	let {
		children
	}: {
		children: Snippet;
	} = $props();

	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<Header />
<main>
	{@render children()}
</main>
<Footer />

<style>
	:global(html) {
		height: 100%;
	}

	:global(body) {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}
</style>