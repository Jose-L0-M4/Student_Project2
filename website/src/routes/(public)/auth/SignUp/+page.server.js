import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';
import { usersService } from '$lib/server/services/users-service.js';
import { registerAuthSchema } from '$lib/server/db/validation.js';

export const load = async (event) => {
	if (event.locals.user) throw redirect(302, '/account');
	return {};
};

export const actions = {
	signUpEmail: async (event) => {
		const formData = await event.request.formData();

		const rawData = {
			name: formData.get('name')?.toString() ?? '',
			email: formData.get('email')?.toString() ?? '',
			password: formData.get('password')?.toString() ?? '',
			dob: formData.get('dob')?.toString() ?? null
		};

		let validatedData;

		try {
			validatedData = registerAuthSchema.parse(rawData);
		} catch (error) {
			return fail(400, { message: 'Please enter valid registration details' });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name: validatedData.name,
					email: validatedData.email,
					password: validatedData.password,
					callbackURL: '/auth/verification-success'
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Registration failed' });
			}
			return fail(500, { message: 'Unexpected error' });
		}

		try {
			await usersService.updateProfileByEmail(validatedData.email, {
				dob: validatedData.dob
			});
		} catch (error) {
			return fail(500, { message: 'Account created, but profile update failed' });
		}

		throw redirect(302, '/account');
	}
};