<script>
	export let note;
	import Dialog from './Dialog.svelte'
	import { Modal } from '$lib/components';
	let dialog;
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

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

<div class="card w-72 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">{note.name}</h2>
		<div class="card-actions justify-end">
			<a href="/notes/{note.id}/edit" class="btn btn-primary">Edit note</a>
			<button on:click={() => dialog.showModal()} class="btn btn-outline">View note</button>
		</div>

		<Dialog bind:dialog on:close={() => console.log('closed')}>
			<p class="text-right">Press Esc to close.</p>
			<h3 class="card-title text-center">{note.name}</h3>
			<textarea style="
				width: 100%; /* Makes the textarea take up 50% of the page width */
				height: 60vh; /* Adjusts the height to 60% of the viewport height */
				padding: 12px; /* Adds some space inside the textarea for text */
				margin: 20px 0; /* Adds space above and below the textarea */
				resize:none;
				">{note.text}</textarea>
				<button on:click={() => dialog.close()} class="btn btn-danger">Close</button>
		</Dialog>

	</div>
</div>
