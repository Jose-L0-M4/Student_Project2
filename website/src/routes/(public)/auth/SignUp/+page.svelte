<!-- src/routes/(public)/auth/register/+page.svelte -->
<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="container d-flex justify-content-center align-items-center" style="min-height: 70vh;">
	<div class="card shadow-sm" style="max-width: 480px; width: 100%;">
		<div class="card-body p-4">
			<h3 class="card-title text-center mb-4">
				<i class="bi bi-person-plus me-2"></i>
				Register
			</h3>

			<form method="post" action="?/signUpEmail" use:enhance>
				<!-- Name Field (Better Auth uses this as display name) -->
				<div class="mb-3">
					<label for="name" class="form-label">Name</label>
					<input id="name" name="name" class="form-control" required />
				</div>

				<!-- Password Field -->
				<div class="mb-3">
					<label for="password" class="form-label">Password</label>
					<input id="password" type="password" name="password" class="form-control" required />
				</div>

				<!-- Date of Birth Field -->
				<div class="mb-3">
					<label for="dob" class="form-label">Date of Birth</label>
					<input id="dob" type="date" name="dob" class="form-control" required />
				</div>

				<!-- Email Field -->
				<div class="mb-3">
					<label for="email" class="form-label">Email</label>
					<input id="email" type="email" name="email" class="form-control" required />
				</div>

				<button type="submit" class="btn btn-primary w-100">
					<i class="bi bi-person-plus me-1"></i> Register
				</button>
			</form>

			{#if form?.message}
				<div class="alert alert-danger mt-3">{form.message}</div>
			{/if}

			<hr class="my-4" />

			<p class="text-center mb-0">
				Already have an account?
				<a href="/auth/login">Login</a>
			</p>
		</div>
	</div>
</div>