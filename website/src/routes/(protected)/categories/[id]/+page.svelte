<script>
  let { data } = $props();
</script>

<h1>{data.category.name}</h1>

{#if data.category.description}
  <p>{data.category.description}</p>
{/if}

<hr />

<h3>Products in this category</h3>

{#if data.categoryProducts.length === 0}
  <p>No products found in this category.</p>
{:else}
  <ul>
    {#each data.categoryProducts as product}
      <li>
        <strong>{product.name}</strong> — €{(product.price / 100).toFixed(2)}
      </li>
    {/each}
  </ul>
{/if}