<script>
  let { data } = $props();
  let order = data.order;

  const euro = new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR'
  });

  const statusImages = {
    pending: '/icons/order/pending.png',
    completed: '/icons/order/completed.png'
  };
</script>

<section aria-labelledby="order-details-heading" class="w-75 mx-auto">
  <h3 id="order-details-heading">Order Details</h3>

  <div class="card shadow-sm my-4">
    <div class="card-body">

      <!-- Order summary -->
      <div class="row mb-4">

        <!-- Left: order details -->
        <div class="col-md-8">
          <dl class="row mb-0">
            <dt class="col-4 fw-semibold">Order ID:</dt>
            <dd class="col-8">{order.id}</dd>

            <dt class="col-4 fw-semibold">User ID:</dt>
            <dd class="col-8">{order.userId}</dd>

            <dt class="col-4 fw-semibold">Status:</dt>
            <dd class="col-8 text-capitalize">{order.status}</dd>

            <dt class="col-4 fw-semibold">Total:</dt>
            <dd class="col-8">{euro.format(order.total / 100)}</dd>

            <dt class="col-4 fw-semibold">Created At:</dt>
            <dd class="col-8">
              {new Date(order.createdAt).toLocaleString()}
            </dd>
          </dl>
        </div>

        <!-- Right: status icon -->
        <div class="col-md-4 d-flex justify-content-center align-items-center">
          <img
            src={statusImages[order.status] ?? '/icons/order/unknown.png'}
            alt={order.status}
            class="order-status-icon {order.status}"
          />
        </div>

      </div> <!-- END row -->

      <!-- Order items -->
      <h5 class="mb-3">Order Items</h5>

      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Product ID</th>
            <th class="text-end">Quantity</th>
            <th class="text-end">Unit Price</th>
            <th class="text-end">Line Total</th>
          </tr>
        </thead>
        <tbody>
          {#each order.items as item}
            <tr>
              <td>{item.productId}</td>
              <td class="text-end">{item.quantity}</td>
              <td class="text-end">{euro.format(item.unitPrice / 100)}</td>
              <td class="text-end">{euro.format(item.quantity * item.unitPrice /100)}</td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr class="table-light fw-semibold">
            <td colspan="3" class="text-end">Order Total</td>
            <td class="text-end">{euro.format(order.total /100)}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Back button -->
      <a href="/orders" class="btn btn-link px-0 mt-3">
        <i class="bi bi-arrow-left me-1"></i>
        Back to orders
      </a>

    </div>
  </div>
</section>

<style>
  .order-status-icon {
    width: clamp(3rem, 8vw, 10rem);
    height: clamp(3rem, 8vw, 10rem);
  }


  .order-status-icon.pending {
    animation: pulse 1.5s ease-in-out 2;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.85;
    }
    50% {
      transform: scale(1.08);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.85;
    }
  }
</style>
