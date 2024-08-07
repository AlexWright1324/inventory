<script>
	import { page } from "$app/stores";
</script>

hello {$page.data.session?.user?.name}