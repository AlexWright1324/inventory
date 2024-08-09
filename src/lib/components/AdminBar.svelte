<script lang="ts">
	import type { Snippet } from "svelte";

    let {
        children
    }: {
        children: Snippet;
    } = $props();
</script>

<div class="bar">
    <div class="text">
        <span>Admin</span>
        <span>Tools</span>
    </div>
    {@render children()}
</div>

<style>
    .bar {
        display: flex;
        align-items: center;
        padding: 8px;
        gap: .5rem;
        width: 100%;
    }
    .text {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>