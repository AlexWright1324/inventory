<script>
	import { page } from '$app/stores';
</script>

<div>
	<span>Categories</span>
	<ul>
		{#if $page.data.categories}
			{#each $page.data.categories as category}
				<li>
					<span>{category.name}</span>
					<form method="post" action="?/deleteCategory">
						<input type="hidden" name="id" value={category.id} />
						<button class="app-button" type="submit">Delete</button>
					</form>
				</li>
			{/each}
		{/if}
	</ul>
	<form method="post" action="?/addCategory">
		<input type="text" name="name" placeholder="Category" required />
		<button class="app-button" type="submit">Add</button>
	</form>
</div>

<div>
	<span>Locations</span>
	<ul>
		{#if $page.data.locations}
			{#each $page.data.locations as location}
				<li>
					<span>{location.name}</span>
					<form method="post" action="?/deleteLocation">
						<input type="hidden" name="id" value={location.id} />
						<button class="app-button" type="submit">Delete</button>
					</form>
				</li>
			{/each}
		{/if}
	</ul>
	<form method="post" action="?/addLocation">
		<input type="text" name="name" placeholder="Location" required />
		<button class="app-button" type="submit">Add</button>
	</form>
</div>

<style>
	li {
		margin-left: 1em;
		& form {
			display: inline-block;
		}
	}
</style>