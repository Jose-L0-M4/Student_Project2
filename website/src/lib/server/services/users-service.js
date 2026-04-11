import { usersDataAccess } from '$lib/server/data-access/users-data-access.js';
import { idSchema, updateProfileSchema } from '$lib/server/db/validation.js';

export const usersService = {
	async getById(id) {
		const validated = idSchema.parse({ id });
		return await usersDataAccess.findById(validated.id);
	},

	async getByEmail(email) {
		return await usersDataAccess.findByEmail(email);
	},

	async getAllUsers() {
		return await usersDataAccess.findAll();
	},

	async updateProfile(id, profileData) {
		const validatedId = idSchema.parse({ id });
		const validatedProfile = updateProfileSchema.parse(profileData);

		return await usersDataAccess.update(validatedId.id, validatedProfile);
	},

	async updateProfileByEmail(email, profileData) {
		const existingUser = await usersDataAccess.findByEmail(email);

		if (!existingUser) {
			throw new Error('User not found');
		}

		const validatedProfile = updateProfileSchema.parse(profileData);

		return await usersDataAccess.update(existingUser.id, validatedProfile);
	}
};