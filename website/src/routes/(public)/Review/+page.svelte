
<script>
  let name = "";
  let email = "";
  let rating = "";
  let review = "";
  let submitted = false;

  function submitReview(e) {
    e.preventDefault();

    console.log({
      name,
      email,
      rating,
      review
    });
    
    submitted = true;

    name = "";
    email = "";
    rating = "";
    review = "";
  }
</script>

<div class="container">
  <h1 class="mb-4">Leave a Review</h1>

  {#if submitted}
    <div class="alert alert-success">
      Thank you for your feedback!
    </div>
  {/if}

  <form on:submit={submitReview} class="card p-4 shadow-sm"></form>

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
      <label class="form-label">Rating</label>
      <select class="form-select" bind:value={rating} required>
        <option value="">Select rating</option>
        <option value="5"> Excellent</option>
        <option value="4"> Good</option>
        <option value="3"> Average</option>
        <option value="2"> Poor</option>
        <option value="1"> Very Poor</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Your Review</label>
      <textarea
        class="form-control"
        rows="4"
        bind:value={review}
        placeholder="Tell us what we can improve..."
        required
    ></textarea>
    </div>

    <button type="submit" class="btn btn-primary">
      Submit Review
    </button>

  
</div>