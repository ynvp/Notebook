<script>
	import { getImageURL } from '$lib/utils';
	export let data;
</script>

<div class="flex flex-col w-full mt-4">
	<h1 class="text-2xl font-bold mt-4">
		{data.note.name}
	</h1>
	<textarea>{data.note.text}</textarea>
</div>
