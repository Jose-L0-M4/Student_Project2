<div class="container d-flex justify-content-center align-items-center vh-100">
  <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
    
    <h2 class="text-center mb-4">Sign Up</h2>

    <form  method="POST">

      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <input 
          type="text" 
          name="name" 
          class="form-control" 
          placeholder="Enter your name"
          required 
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input 
          type="email" 
          name="email" 
          class="form-control" 
          placeholder="Enter your email"
          required 
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input 
          type="password" 
          name="password" 
          class="form-control" 
          placeholder="Create a password"
          required 
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword" 
          class="form-control" 
          placeholder="Confirm your password"
          required 
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">
        Sign Up
      </button>

    </form>

    <p class="text-center mt-3 mb-0">
      Already have an account? 
      <a href="/LogIn">Log in</a>
    </p>

  </div>
</div>