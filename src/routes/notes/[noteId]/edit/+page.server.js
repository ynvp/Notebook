import { error, invalid, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs, validateData } from '$lib/utils';
import { updateNoteSchema } from '$lib/schemas';
import { serialize } from 'object-to-formdata';

export const load = async ({ locals, params }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const note = serializeNonPOJOs(
			await locals.pb.collection('notes').getOne(params.noteId)
		);

		if (locals.user.id === note.user) {
			return {
				note
			};
		} else {
			throw error(403, 'Forbidden');
		}
	} catch (err) {
		console.log('Error: ', err);
		throw error(err.status, err.message);
	}
};

export const actions = {
	updateNote: async ({ request, locals, params }) => {
		const body = await request.formData();
		body.append('timestamp', new Date().getTime());

		const { formData, errors } = await validateData(body, updateNoteSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return invalid(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('notes').update(params.noteId, serialize(formData));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/my/notes`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('notes').update(params.noteId, { thumbnail: null });
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
