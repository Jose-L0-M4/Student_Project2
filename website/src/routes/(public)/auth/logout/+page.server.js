import { redirect } from '@sveltejs/kit';

import { auth } from '$lib/server/auth';

export const load = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth/login');
	}
	return { user: event.locals.user };
};


export const actions = {
	default: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		return redirect(302, '/auth/login');
	}
};
