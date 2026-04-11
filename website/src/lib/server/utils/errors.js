import { ZodError } from 'zod';

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export function handleError(error) {
  if (error instanceof ZodError) {
    return {
      status: 400,
      message: error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
    };
  }

  if (error instanceof ValidationError) {
    return { status: 400, message: error.message };
  }

  if (error instanceof NotFoundError) {
    return { status: 404, message: error.message };
  }

  if (error instanceof ForbiddenError) {
    return { status: 403, message: error.message };
  }

  return { status: 500, message: 'Internal server error' };
}