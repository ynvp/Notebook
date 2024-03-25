import { error } from "@sveltejs/kit";
import { serializeNonPOJOs } from "$lib/utils";

export const load = ({ locals }) => {
	const getNotes = async () => {
		try {
			const notes = serializeNonPOJOs(
				await locals.pb.collection("notes").getFullList(undefined),
			);
			return notes;
		} catch (err) {
			console.log("Error:", err);
			throw error(err.status, err.message);
		}
	};

	return {
		notes: getNotes(),
	};
};
