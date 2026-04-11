import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/auth.schema.js';

const publicCols = {
	id: user.id,
	name: user.name,
	email: user.email,
	dob: user.dob,
	role: user.role,
	emailVerified: user.emailVerified,
	image: user.image,
	createdAt: user.createdAt,
	updatedAt: user.updatedAt
};

export const usersDataAccess = {
	async findById(id) {
		const result = await db.select(publicCols).from(user).where(eq(user.id, id)).limit(1);
		return result[0] ?? null;
	},

	async findByEmail(email) {
		const result = await db.select(publicCols).from(user).where(eq(user.email, email)).limit(1);
		return result[0] ?? null;
	},

	async findAll() {
		return await db.select(publicCols).from(user);
	},

	async update(id, userData) {
		const result = await db.update(user).set(userData).where(eq(user.id, id)).returning(publicCols);
		return result[0] ?? null;
	},

	async delete(id) {
		const result = await db.delete(user).where(eq(user.id, id));
		return result.rowsAffected > 0;
	}
};