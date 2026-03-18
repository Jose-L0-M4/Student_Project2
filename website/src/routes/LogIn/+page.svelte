<div class="container d-flex justify-content-center align-items-center vh-100">
  <div class="card shadow p-4" style="max-width: 500px; width: 100%;">
    
    <h2 class="text-center mb-4">Log In</h2>

    <form action="/login" method="post">
      
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
          placeholder="Enter your password"
          required 
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">
        Log In
      </button>

    </form>

    <p class="text-center mt-3 mb-0">
      Don’t have an account? 
      <a href="/SignUp">Sign up</a>
    </p>

  </div>
</div>