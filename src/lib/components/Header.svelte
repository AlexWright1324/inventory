<script lang="ts">
	import { page } from "$app/stores"
	import { signIn, signOut } from "@auth/sveltekit/client"
	import Keycloak from "@auth/sveltekit/providers/keycloak"

	import InventorySVG from "$lib/assets/inventory.svg?raw"
	import { LogIn, LogOut, ShoppingBasket } from "lucide-svelte"

	import { Basket } from "$lib/client/basket"

	let basket = Basket()
</script>

<header>
	<div class="links">
		<a href="/">{@html InventorySVG}</a>
		<ul>
			<li><a href="/assets">Assets</a></li>
			{#if $page.data.admin}
				<li>
					<a href="/settings">Settings</a>
				</li>
			{/if}
		</ul>
	</div>
	<div class="links">
		<ul>
			{#if $page.data.session}
				<li>
					<span>{$page.data.session.user?.name}</span>
				</li>
				<li>
					<a class="icon" href="/basket">
						<ShoppingBasket />
						{#if $basket.length > 0}
							<span id="basket-count">{$basket.length}</span>
						{/if}
					</a>
				</li>
				<li>
					<button onclick={() => signOut()}><LogOut /></button>
				</li>
			{:else}
				<li>
					<button onclick={() => signIn(Keycloak({}).id)}><LogIn /></button>
				</li>
			{/if}
		</ul>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: var(--app-max-page-width);
		border-bottom: solid rgb(58, 125, 255) 1px;
	}

	.icon {
		position: relative;
	}

	#basket-count {
		position: absolute;
		top: 0;
		right: 0;
		background-color: rgb(58, 125, 255);
		color: white;
		border-radius: 50%;
		width: 1rem;
		height: 1rem;
		font-size: 0.75rem;
		font-weight: bold;
		text-align: center;
	}

	.links {
		display: flex;
		align-items: center;
		padding: 8px;

		& a,
		button {
			display: inline-block;
			text-decoration: none;
			color: inherit;
			opacity: 0.65;
			transition: opacity 0.5s;

			&:hover {
				opacity: 1;
			}
		}
		& ul {
			list-style: none;
			display: flex;
			align-items: center;

			& li {
				display: inline-block;
			}
			& a,
			button {
				padding: 8px;
			}
			& button,
			.icon {
				padding-left: 14px;
				padding-bottom: 4px;
			}
		}
	}
</style>
