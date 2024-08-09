<script lang="ts">
	import { page } from '$app/stores';
	import { deserialize, enhance } from '$app/forms';
	import { Carta, MarkdownEditor } from 'carta-md';
	import { attachment } from '@cartamd/plugin-attachment';
	import DOMPurify from 'isomorphic-dompurify';

	import Bar from '$lib/components/AdminBar.svelte';

	const upload = async (file: File): Promise<string | null> => {
		let formData = new FormData();
		formData.append('file', file);
		const r = await fetch('?/upload', {
			method: 'POST',
			body: formData
		});
		if (!r.ok) return null;

		const { data } = deserialize(await r.text());
		console.log(data.url);
		return data.url;
	};

	const asset = $page.data.asset;
	const carta = new Carta({
		sanitizer: DOMPurify.sanitize,
		extensions: [
			attachment({
				async upload(file) {
					return await upload(file);
				}
			})
		]
	});
</script>

<Bar>
	<button form="asset" type="submit" class="app-button">Update</button>
</Bar>

<form style="display: contents;" action="?/update" method="POST" id="asset">
	<ul>
		<li>
			<span>Name</span>
			<input type="text" name="name" value={asset.name} />
		</li>

		<li>
			<span>Tag</span>
			<input type="text" name="tag" value={asset.tag} />
		</li>
		<li>
			<label for="location-select">Locations</label>
			<select name="locationId" id="location-select">
				{#each $page.data.locations as location}
					<option value={location.id}>{location.name}</option>
				{/each}
			</select>
		</li>
	</ul>

	{#if asset.categories}
		{#each asset.categories as category}
			{category.name}
		{/each}
	{/if}

	<MarkdownEditor {carta} bind:value={asset.description} />

	<input type="hidden" name="description" value={asset.description} />
</form>

<div>
	<span>Files:</span>
	<form use:enhance action="?/upload" method="POST" style="display: contents;" enctype="multipart/form-data">
		<input type="file" name="file" required />
		<button type="submit" class="app-button">Upload File</button>
	</form>
	<ul>
		{#each $page.data.files as file}
			<li>
				<a href="/store/{asset.id}/{file}" class="app-button">{file}</a>
				<form use:enhance method="POST" action="?/mkimage" style="display: contents;">
					<input type="hidden" name="file" value={file} />
					<button type="submit" class="app-button" disabled={file === asset.image}>Make Image</button>
				</form>
				<form use:enhance method="POST" action="?/delete" style="display: contents;">
					<input type="hidden" name="file" value={file} />
					<button type="submit" class="app-button">Delete</button>
				</form>
			</li>
		{/each}
	</ul>
</div>