import { betterAuth } from 'better-auth/minimal';

import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { sveltekitCookies } from 'better-auth/svelte-kit';

import { env } from '$env/dynamic/private';

import { getRequestEvent } from '$app/server';

import { db } from '$lib/server/db';


export const auth = betterAuth({

baseURL: env.ORIGIN,

secret: env.BETTER_AUTH_SECRET,


// Tell Better Auth - Do NOT generate string IDs. Use the database’s auto-increment numeric ID instead.

advanced: {

database: {

generateId: 'serial'

}

},


database: drizzleAdapter(db, { provider: 'sqlite' }),

emailAndPassword: { enabled: true },

plugins: [sveltekitCookies(getRequestEvent)] // make sure this is the last plugin in the array

});