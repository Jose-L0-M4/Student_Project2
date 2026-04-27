<script>
  let { data } = $props();
  const { order } = data;

  const euro = new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR'
  });
</script>

<h2>Order Confirmed</h2>

<p>
  Thank you for your order.<br />
  Your order ID is <strong>#{order.id}</strong>.
</p>

<p>
  <strong>Total:</strong> {euro.format(order.total / 100)}<br />
  <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
</p>

<hr />

<h4>Items</h4>

<ul class="list-group mb-4">
  {#each order.items as item}
    <li class="list-group-item d-flex justify-content-between">
      <div>
        <strong>{item.productId}</strong><br />
        Qty: {item.quantity}
      </div>

      <div>
        {euro.format((item.unitPrice * item.quantity) / 100)}
      </div>
    </li>
  {/each}
</ul>

<a href="/orders" class="btn btn-primary">
  View all orders
</a>