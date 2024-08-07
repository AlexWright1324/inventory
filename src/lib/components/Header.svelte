<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Keycloak from '@auth/sveltekit/providers/keycloak';
</script>

<header>
    <div>
        <a href="/">UWCS Inventory</a>
        <a href="/assets">Assets</a>
    </div>
	<div>
		{#if $page.data.session}
			<span>Logged in as {$page.data.session.user?.name}</span>
			<button onclick={signOut}>Sign Out</button>
		{:else}
			<button onclick={signIn(Keycloak({}).id)}>Sign In</button>
		{/if}
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: gray;
	}
</style>
