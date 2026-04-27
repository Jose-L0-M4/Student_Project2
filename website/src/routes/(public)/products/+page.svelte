<script>
    import { enhance } from '$app/forms';
    import ProductForm from '$lib/components/ProductForm.svelte';
    import { slide, fade } from 'svelte/transition';
    

    // get data that was returned when the page was loaded
    let { data } = $props();
    
    // used to keep track of which category the user selected
    let selectedCatId = $state(null);

    // Use $derived.by when your derived value depends on multiple signals
    // $derived is fine for simple one-signal cases.
    // This variable either has all products or those for a category
    let products = $derived.by(() => {
        if (selectedCatId === null) return data.products;
        return data.products.filter(
            prod => prod.categoryId === selectedCatId
        );
    });

    // selectedCatId = the category id the user clicked on 
    function filterByCat(catId) {
        selectedCatId = catId === null ? null : Number(catId);
    }

    // The number is stored without decimal places, so format it.
    const euro = new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: 'EUR'
    });

    /* ========================= 
       Add, Update and Delete
    ========================== */

    // Page-level state for form visibility and updating
    let showForm = $state(false);
    let product = $state(null);

    // Show the form when the user clicks the add button
    function handleAddNew() {
        product = null;
        showForm = true;
	}
      
    // Function when updating the form
    function handleUpdate(prod) {
        product = prod;
		showForm = true;
	}

    /* ========================= 
       Modal Popup (Delete)
    ========================== */

    // Track which product is pending deletion
    let productToDelete = $state(null);

    // Whether the modal is visible
    let showDeleteModal = $state(false);

    // Modal error shown inside the delete modal
    let modalDeleteError = $state('');

    // Open modal and remember the selected product
    function openDeleteModal(prod) {
        productToDelete = prod;
        showDeleteModal = true;
        modalDeleteError = ''; // clear old errors
    }

    // Close modal and clear selected product/error
    function closeDeleteModal() {
        showDeleteModal = false;
        productToDelete = null;
        modalDeleteError = '';
    }

    // Dedicated enhance handler for delete modal form
    // - On success: close modal
    // - On failure: keep modal open and show the error message
    function enhanceDeleteModal() {
        return async ({ result, update }) => {
            if (!result) return;

            if (result.type === 'success') {
                // Close FIRST so UI updates immediately
                closeDeleteModal();

                // This re-runs the page load and refreshes `data`
                await update();
            }

            if (result.type === 'failure') {
                // Keep modal open and show error inside it
                modalDeleteError = result.data?.errors?.general
                    || result.data?.message
                    || result.data?.error
                    || 'Delete failed';
            }
        };

        
    }
</script>

<section id="existing-products">
    <h3>Products By Category</h3>
    <div class="row">
        <!-- left column-->
        <div class="col-sm-2">
            <div id="categoryList" class="list-group">
                <!-- highlight the clicked category using selectedCatId -->
			    <button
                    class="list-group-item list-group-item-action {(selectedCatId === null) ? 'active' : ''}"
                    onclick={() => filterByCat(null)}
                >
                    All
                </button>

                {#each data.categories as cat}
				    <button
                        class="list-group-item list-group-item-action {(selectedCatId === Number(cat.id)) ? 'active' : ''}"
                        onclick={() => filterByCat(cat.id)}
                    >
                        {cat.name}
                    </button>
			    {/each}
		    </div>

            <br>

            <button type="button" class="btn btn-success w-100" onclick={handleAddNew}>
	            <i class="bi bi-plus-circle"></i> Add New Product
            </button>
        </div>

        <!-- Right column -->
        <div class="col-sm-10">
            
            <!-- Product form - Show form at the top if active -->
            {#if showForm}
                <div transition:slide={{ duration: 400 }}>
                    <ProductForm
                        {product}
                        categories={data.categories}
                        onCancel={() => {
                            showForm = false;
                            product = null;
                        }}
                    />
                    <!-- optional visual separation -->
                    <hr class="my-4" />
                </div>
            {/if}

            <!-- Products Table -->
            <table class="table table-bordered table-hover w-100">
                <thead class="table-success success-header">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- iterate over products, adding a new table row for each product -->
                    {#each products as product (product.id)}
                        <tr>
                            <td>{product.id}</td>
                            <td><a href={`/products/${product.id}`}>{product.name}</a></td>
                            <td>{product.description}</td>
                            <td>{euro.format(product.price / 100)}</td>
                            <td class="text-center">
                                <img
                                    src={`/uploads/${product.image}`}
                                    alt={product.name}
                                    class="img-fluid"
                                    style="max-width: 120px;max-height: 100px;"
                                />
                            </td>
                            <td>{product.quantity}</td>
                            <td>{data.categories.find(cat => cat.id === product.categoryId)?.name ?? 'Unknown'}</td> 

                            <td>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-primary me-1"
                                    aria-label="Update"
                                    onclick={() => handleUpdate(product)}
                                >
                                    <i class="bi bi-pencil"></i>
                                </button>

                                <!-- NOTE: the button is type="button" so it does NOT submit here -->
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-danger"
                                    aria-label="Delete"
                                    onclick={() => openDeleteModal(product)}
                                >
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div> <!-- Close of right column -->
    </div>
</section>

<!-- Modal Popup with smooth fade -->
{#if showDeleteModal}
<div
    class="modal d-block"
    tabindex="-1"
    style="background: rgba(0,0,0,0.5); z-index: 1050;"
    transition:fade|slide
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title">Confirm Delete</h5>
        <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onclick={closeDeleteModal}
        ></button>
      </div>

      <div class="modal-body">
        <p>
            Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
        </p>

        <!-- Show failure message inside the modal -->
        {#if modalDeleteError}
          <div class="alert alert-danger mt-3">{modalDeleteError}</div>
        {/if}
      </div>

      <div class="modal-footer">
        <!-- This is the REAL delete form -->
        <form method="POST" action="?/deleteProduct" use:enhance={enhanceDeleteModal}>
          <input type="hidden" name="prodId" value={productToDelete?.id} />
          <button type="submit" class="btn btn-danger">Yes, Delete</button>

          <button
            type="button"
            class="btn btn-secondary"
            onclick={closeDeleteModal}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
{/if}

<style>
    .success-header {
        --bs-table-bg: var(--bs-success);
        --bs-table-color: #fff;
    }
</style>