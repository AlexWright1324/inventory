<script lang="ts">
	import { enhance } from "$app/forms"
	import type { ActionData, PageData } from "./$types"

	export let data: PageData
	export let form: ActionData
</script>

<div class="box">
{#each [[data.categories, "Categories", "Category"], [data.locations, "Locations", "Location"]] as const as [items, plural, single]}
	<div>
		<span>{plural}</span>
		<form method="post" action="?/add{single}" use:enhance>
			<input type="text" name="name" placeholder={single} required />
			<button class="app-button" type="submit">Add</button>
		</form>
		<p class="error">&nbsp;
			{#if form?.type === single}
				{#if form?.exists}
					{single} already Exists
				{/if}
			{/if}
		</p>
		<ul>
			{#each items as item}
				<li>
					<span>{item.name}</span>
					<form method="post" action="?/delete{single}" use:enhance>
						<input type="hidden" name="name" value={item.name} />
						<button class="app-button" type="submit">Delete</button>
					</form>
				</li>
			{:else}
				<li>
					<span>No {plural}</span>
				</li>
			{/each}
		</ul>
	</div>
{/each}
</div>
<style>
	li {
		margin-left: 1em;
		& form {
			display: inline-block;
		}
	}
	.box {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
</style>
