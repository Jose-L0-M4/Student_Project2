<script>
  let { data } = $props();

  const product = $derived(data.product);
  const catName = $derived(data.categoryName);

  // FIX: was missing
  let added = false;

  const euro = new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR'
  });
</script>

<h3>Product Details</h3>

<div class="card shadow-sm my-4">
  <div class="row g-0">

    <!-- Image Column -->
    <div class="col-12 col-md-5 text-center p-3">
      <img
        src={`/uploads/${product.image}`}
        alt={product.name}
        class="img-fluid rounded"
        style="max-height: 400px; object-fit: contain;"
      />
    </div>

    <!-- Details Column -->
    <div class="col-12 col-md-7">
      <div class="card-body">

        <h3 class="card-title mb-4">{product.name}</h3>

        <dl class="row mb-0">
          <dt class="col-4 fw-semibold">Description:</dt>
          <dd class="col-8">{product.description}</dd>

          <dt class="col-4 fw-semibold">Price:</dt>
          <dd class="col-8">{euro.format(product.price / 100)}</dd>

          <dt class="col-4 fw-semibold">Quantity:</dt>
          <dd class="col-8">{product.quantity}</dd>

          <dt class="col-4 fw-semibold">Category:</dt>
          <dd class="col-8">{catName}</dd>
        </dl>

        <a href="/products" class="btn btn-link px-0 mt-3">
          <i class="bi bi-arrow-left me-1"></i> Back to products
        </a>

      </div>
    </div>
  </div>
</div>

<!-- Cart Button -->
<form
  method="post"
  action="?/addToCart"
  class="mt-4"
  use:enhance={({ result }) => {
    // FIX: only set if success
    if (result.type === 'success') {
      added = true;
    }
  }}
>
  <input type="hidden" name="productId" value={product.id} />

  <button
    type="submit"
    class="btn btn-success btn-lg"
    disabled={added || product.quantity === 0}
  >
    {#if added}
      <i class="bi bi-check-circle me-2"></i>
      Added
    {:else}
      <i class="bi bi-cart-plus me-2"></i>
      Add to Cart
    {/if}
  </button>
</form>

<!-- Back Button -->