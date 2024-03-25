<script>
	import { enhance } from '$app/forms';
	import { Modal } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	import toast from 'svelte-french-toast';
	export let note;

	let modalOpen;
	let loading = false;

	const submitDeleteNote = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Note deleted successfully!');
					await update();
					break;
				case 'error':
					toast.error('Could not delete note. Try again later.');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	$: modalOpen = false;
</script>

<div class="w-full h-28 flex items-center justify-between">
	<div class="flex flex-col w-full ml-4 h-full justify-center">
		<a href="/notes/{note.id}" class="font-semibold text-lg">{note.name}</a>
	</div>
	<div class="flex items-center justify-end w-full">
		<a href="/notes/{note.id}/edit" class="btn btn-outline">Edit Note</a>
		<Modal label={note.id} checked={modalOpen}>
			<span slot="trigger" class="btn btn-error ml-2">Delete</span>
			<div slot="heading">
				<h3 class="text-2xl">Delete {note.name}</h3>
				<p class="text-base font-normal mt-2">
					Are you sure you want to delete this note? Once deleted, the note cannot be
					restored.
				</p>
			</div>
			<div slot="actions" class="flex w-full items-center justify-center space-x-2">
				<label for={note.id} class="btn btn-outline">Cancel</label>
				<form action="?/deleteNote" method="POST" use:enhance={submitDeleteNote}>
					<input type="hidden" name="id" value={note.id} />
					<button type="submit" class="btn btn-error" disabled={loading}>Delete</button>
				</form>
			</div>
		</Modal>
	</div>
</div>
