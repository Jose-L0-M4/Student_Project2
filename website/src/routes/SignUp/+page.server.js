export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // basic validation
    if (password !== confirmPassword) {
      return {
        error: 'Passwords do not match'
      };
      
    }

    console.log({ name, email, password });

    // TODO: save user to DB here

    return {
      success: true
    };
  }
};