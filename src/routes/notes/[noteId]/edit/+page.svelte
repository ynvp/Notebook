<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	export let form;

	let loading = false;

	const submitUpdateNote = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			method="POST"
			action="?/updateNote"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdateNote}
		>
			<h3 class="text-3xl font-bold">Edit {data.note.name}</h3>
			<Input
				id="name"
				label="Note name"
				value={form?.data?.name ?? data.note.name}
				errors={form?.errors?.name}
			/>
			<TextArea
				id="text"
				label="Note text"
				value={form?.data?.text ?? data.note.text}
				errors={form?.errors?.text}
			/>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Save Changes</button>
			</div>
		</form>
	</div>
</div>
