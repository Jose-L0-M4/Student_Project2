<script>
  let { data } = $props();

  const items = data.items ?? [];
  const total = data.total ?? 0;
</script>

<h2>Your Cart</h2>

{#if items.length === 0}
  <p>Your cart is empty.</p>
{:else}
  <table class="table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Total</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      {#each items as item}
        <tr>
          <td>{item.name}</td>

          <td>€{(item.unitPrice / 100).toFixed(2)}</td>

          <td>
            <form method="post" action="?/updateQuantity">
              <input type="hidden" name="cartItemId" value={item.id} />

              <input
                type="number"
                name="quantity"
                min="1"
                value={item.quantity}
              />

              <button class="btn btn-sm btn-secondary">
                Update
              </button>
            </form>
          </td>

          <td>
            €{((item.unitPrice * item.quantity) / 100).toFixed(2)}
          </td>

          <td>
            <form method="post" action="?/removeItem">
              <input type="hidden" name="cartItemId" value={item.id} />

              <button class="btn btn-sm btn-danger">
                Remove
              </button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <h4>Total: €{(total / 100).toFixed(2)}</h4>

  <form method="post" action="?/checkout">
    <button class="btn btn-primary">
      Checkout
    </button>
  </form>
{/if}