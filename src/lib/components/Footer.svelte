<script lang="ts">
	import UWCSSVG from '$lib/assets/uwcs.svg?raw';
	import { Github } from 'lucide-svelte';
</script>

<footer>
	<a href="https://uwcs.co.uk">{@html UWCSSVG}</a>
    <div class="links">
        <a href="https://github.com/UWCS/inventory" target="_blank"><Github /></a>
    </div>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		max-width: var(--app-max-page-width);
		width: 100%;
		padding: 8px;

		& a {
			display: inline-block;
			text-decoration: none;
			color: inherit;
			opacity: 0.65;
			transition: opacity 0.5s;

			&:hover {
				opacity: 1;
			}
		}

        & .links a {
            padding: 8px;
        }
	}
</style>
