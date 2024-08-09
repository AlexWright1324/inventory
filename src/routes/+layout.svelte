<script lang="ts">
	import type { Snippet } from "svelte";
    
	let {
		children
	}: {
		children: Snippet;
	} = $props();

	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import "ress/ress.css";
	import "carta-md/default.css";
    import "@cartamd/plugin-attachment/default.css";
	import "github-markdown-css/github-markdown-dark.css";
	import "../app.css";
</script>

<Header />
<main>
	{@render children()}
</main>
<Footer />

<style>
	main {
		flex: 1;
		max-width: var(--app-max-page-width);
		width: 100%;
		padding: 1.5rem 1rem 1.5rem 1rem;
	}
</style>