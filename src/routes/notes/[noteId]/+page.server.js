import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const getNote = async (noteId) => {
		try {
			const note = serializeNonPOJOs(await locals.pb.collection('notes').getOne(noteId));
			return note;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		note: getNote(params.noteId)
	};
};
