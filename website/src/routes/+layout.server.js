import { usersService } from '$lib/server/services/users-service.js';

export async function load({ locals }) {
  if (!locals.user) {
    return {
      user: null
    };
  }
  
  const fullUser = await usersService.getById(Number(locals.user.id));

  return {
    user: fullUser
  };
}