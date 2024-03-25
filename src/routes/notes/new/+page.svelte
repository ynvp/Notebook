<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<h3 class="text-3xl font-bold">Tell us more about this note</h3>
			<Input id="name" label="Note name" value={form?.data?.name} errors={form?.errors?.name} />
			<TextArea
				id="text"
				label="Note text"
				type="text"
				value={form?.data?.text}
				errors={form?.errors?.text}
			/>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Note</button>
			</div>
		</form>
	</div>
</div>
