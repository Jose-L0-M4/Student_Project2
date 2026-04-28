<script>
  let { data } = $props();

  const euro = new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR'
  });
</script>

<h2>Order Confirmed</h2>

<p>Thank you for your order. Your order ID is <strong>#{data.order.id}</strong>.</p>
<p><strong>Total:</strong> {euro.format(data.order.total / 100)}</p>
<p><strong>Date:</strong> {new Date(data.order.createdAt).toLocaleString()}</p>

<a href="/orders" class="btn btn-primary">View all orders</a>

