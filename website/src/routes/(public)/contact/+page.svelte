<script>
  let name = '';
  let email = '';
  let message = '';

  function handleSubmit() {
    alert("Message sent! (frontend only for now)");
    name = '';
    email = '';
    message = '';
  }
</script>

<div class="container mt-5">

  <h1 class="text-center mb-5">Contact Us</h1>

  <div class="row g-4">

    <!-- LEFT: Info -->
    <div class="col-md-5">
      <div class="card p-4 shadow h-100">
        <h4 class="mb-3">Get in Touch</h4>

        <p class="text-muted">
          Have questions about workouts, diets, or your account?  
          We’d love to hear from you.
        </p>

        <p><i class="bi bi-envelope"></i> support@fitworld.com</p>
        <p><i class="bi bi-geo-alt"></i> Dublin, Ireland</p>
        <p><i class="bi bi-clock"></i> Mon - Fri, 9am - 6pm</p>
      </div>
    </div>

    <!-- RIGHT: Form -->
    <div class="col-md-7">
      <div class="card p-4 shadow">

        <form on:submit|preventDefault={handleSubmit}>

          <div class="mb-3">
            <label class="form-label">Name</label>
            <input 
              type="text" 
              class="form-control" 
              bind:value={name}
              required 
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              class="form-control" 
              bind:value={email}
              required 
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Message</label>
            <textarea 
              class="form-control" 
              rows="5"
              bind:value={message}
              required
            ></textarea>
          </div>

          <button class="btn btn-primary w-100">
            Send Message
          </button>

        </form>

      </div>
    </div>

  </div>
</div>