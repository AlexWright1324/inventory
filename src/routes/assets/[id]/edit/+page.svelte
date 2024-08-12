<script lang="ts">
	import type { PageData, ActionData } from "./$types"
	import type { ActionResult } from "@sveltejs/kit"
	import { applyAction, deserialize, enhance } from "$app/forms"
	import { Carta, MarkdownEditor } from "carta-md"
	import { attachment } from "@cartamd/plugin-attachment"
	import DOMPurify from "isomorphic-dompurify"

	import Bar from "$lib/components/AdminBar.svelte"
	import { invalidateAll } from "$app/navigation"

	const upload = async (file: File): Promise<string | null> => {
		let formData = new FormData()
		formData.append("file", file)
		const response = await fetch("?/upload", {
			method: "POST",
			body: formData
		})
		if (!response.ok) return null

		const result: ActionResult = deserialize(await response.text())
		if (result.type === "success") {
			await invalidateAll()
		}
		await applyAction(result)
		console.log(form?.url)
		return form?.url ? form.url : null
	}

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize,
		extensions: [
			attachment({
				async upload(file) {
					return await upload(file)
				}
			})
		]
	})

	export let data: PageData
	export let form: ActionData

	let localData = data
</script>

<Bar>
	<button form="asset" type="submit" class="app-button">Update</button>
</Bar>

<form style="display: contents;" action="?/update" method="POST" id="asset">
	<ul>
		<li>
			<label>
				<span>Name</span>
				<input type="text" name="name" value={localData.asset.name} />
			</label>
		</li>

		<li>
			<label>
				<span>Tag</span>
				<input type="text" name="tag" value={localData.asset.tag} />
			</label>
		</li>

		<li>
			<label>
				<span>Quantity</span>
				<input type="number" name="quantity" min="1" value={localData.asset.quantity} />
			</label>
		</li>

		<li>
			<label>
				<span>Locations</span>
				<select name="locationName">
					{#each localData.locations as location}
						<option value={location.name} selected={localData.asset.location?.name === location.name}>{location.name}</option>
					{/each}
				</select>
			</label>
		</li>
	</ul>

	{#each localData.asset.categories as category}
		{category.name}
		{:else}
		No Categories
	{/each}

	<MarkdownEditor {carta} bind:value={localData.asset.description} />

	<input type="hidden" name="description" value={localData.asset.description} />
</form>

<div>
	<span>Files:</span>
	<form use:enhance action="?/upload" method="POST" style="display: contents;" enctype="multipart/form-data">
		<input type="file" name="file" required />
		<button type="submit" class="app-button">Upload File</button>
	</form>
	<ul>
		{#each data.files as file}
			<li>
				<a href="/store/{data.asset.id}/{file}" class="app-button">{file}</a>
				<form use:enhance method="POST" action="?/mkimage" style="display: contents;">
					<input type="hidden" name="file" value={file} />
					<button type="submit" class="app-button" disabled={file === data.asset.image}>Make Image</button>
				</form>
				<form use:enhance method="POST" action="?/delete" style="display: contents;">
					<input type="hidden" name="file" value={file} />
					<button type="submit" class="app-button">Delete</button>
				</form>
			</li>
		{/each}
	</ul>
</div>
