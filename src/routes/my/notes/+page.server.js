import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const getUsersNotes = async (userId) => {
		try {
			const notes = serializeNonPOJOs(
				await locals.pb.collection('notes').getFullList(undefined, {
					filter: `user = "${userId}"`
				})
			);
			return notes;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		notes: getUsersNotes(locals.user.id)
	};
};

export const actions = {
	deleteNote: async ({ request, locals }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('notes').delete(id);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		return {
			success: true
		};
	}
};
