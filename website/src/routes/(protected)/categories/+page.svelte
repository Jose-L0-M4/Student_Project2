<script>
    import { enhance } from '$app/forms';
    import CategoryForm from '$lib/components/CategoriesForm.svelte';
    import { slide, fade } from 'svelte/transition';

    // get data that was returned when the page was loaded
    let { data } = $props();
    
    let categories = $derived(data.prodCategories);

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
    let category = $state(null);

    // Show the form when the user clicks the add button
    function handleAddNew() {
        category = null;
        showForm = true;
	}
      
    // Function when updating the form
    function handleUpdate(cat) {
        category = cat;
		showForm = true;
	}

    /* ========================= 
       Modal Popup (Delete)
    ========================== */

    // Track which category is pending deletion
    let catToDelete = $state(null);

    // Whether the modal is visible
    let showDeleteModal = $state(false);

    // Modal error shown inside the delete modal
    let modalDeleteError = $state('');

    // Open modal and remember the selected category
    function openDeleteModal(cat) {
        catToDelete = cat;
        showDeleteModal = true;
        modalDeleteError = ''; // clear old errors
    }

    // Close modal and clear selected category/error
    function closeDeleteModal() {
        showDeleteModal = false;
        catToDelete = null;
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

<section id="existing-categories">
    <h3>Categories</h3>
    <div class="row">
        <!-- left column-->
        <div class="col-sm-2">
            <button type="button" class="btn btn-success w-100" onclick={handleAddNew}>
	            <i class="bi bi-plus-circle"></i> Add New Category
            </button>
        </div>

        <!-- Right column -->
        <div class="col-sm-10">
            
            <!-- Category form - Show form at the top if active -->
            {#if showForm}
                <div transition:slide={{ duration: 400 }}>
                    <CategoryForm
                        {category}
                        onCancel={() => {
                            showForm = false;
                            category = null;
                        }}
                    />
                    <!-- optional visual separation -->
                    <hr class="my-4" />
                </div>
            {/if}

            <!-- Categories Table -->
            <table class="table table-bordered table-hover w-100">
                <thead class="table-success success-header">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- iterate over or categories, adding a new table row for each category -->
                    {#each categories as category (category.id)}
                        <tr>
                            <td>{category.id}</td>
                            <td><a href={`/category/${category.id}`}>{category.name}</a></td>
                            <td>{category.description}</td>
                            <td>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-primary me-1"
                                    aria-label="Update"
                                    onclick={() => handleUpdate(category)}
                                >
                                    <i class="bi bi-pencil"></i>
                                </button>

                                <!-- NOTE: the button is type="button" so it does NOT submit here -->
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-danger"
                                    aria-label="Delete"
                                    onclick={() => openDeleteModal(category)}
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
            Are you sure you want to delete <strong>{catToDelete?.name}</strong>?
        </p>

        <!-- Show failure message inside the modal -->
        {#if modalDeleteError}
          <div class="alert alert-danger mt-3">{modalDeleteError}</div>
        {/if}
      </div>

      <div class="modal-footer">
        <!-- This is the REAL delete form -->
        <form method="POST" action="?/deleteCategory" use:enhance={enhanceDeleteModal}>
          <input type="hidden" name="catId" value={catToDelete?.id} />
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