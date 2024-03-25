<script>
	import { NoteCard } from '$lib/components';
	export let data;
</script>

<div class="flex flex-col gap-3">
	<h1 class="text-xl font-bold">Recent Notes</h1>
	<div class="grid grid-cols-3 gap-2">
		{#each data.notes as note}
			<NoteCard {note} />
		{/each}
	</div>
</div>
