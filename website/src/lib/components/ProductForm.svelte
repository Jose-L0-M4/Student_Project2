<script>
    import { enhance } from '$app/forms';

    /* =========================
       Props
    ========================== */
    let {
        product = null,     // null = add mode, object = update mode
        categories = [],
        onCancel
    } = $props();

    /* =========================
       Derived state
    ========================== */
    let isUpdateMode = $derived(product != null);
    let formTitle = $derived(isUpdateMode ? 'Update Product' : 'Add New Product');

    /* =========================
       Local state
    ========================== */
    let errors = $state({});
    let successMessage = $state('');

    let prodForm = $state({
        prodName: '',
        prodDesc: '',
        prodPrice: 0,
        prodImage: '',
        prodQty: 0,
        prodCatId: 0
    });

    /* =========================
       Sync product → form
    ========================== */
    $effect(() => {
        if (product) {
            prodForm.prodName = product.name ?? '';
            prodForm.prodDesc = product.description ?? '';
            prodForm.prodPrice = product.price ?? 0;
            prodForm.prodImage = product.image ?? '';
            prodForm.prodQty = product.quantity ?? 0;
            prodForm.prodCatId =
                product.categoryId ?? (categories[0]?.id ?? 0);
        } else {
            prodForm.prodName = '';
            prodForm.prodDesc = '';
            prodForm.prodPrice = 0;
            prodForm.prodImage = '';
            prodForm.prodQty = 0;
            prodForm.prodCatId = categories[0]?.id ?? 0;
        }
    });

    /* =========================
       enhance handler
    ========================== */
    function enhanceProductForm() {
        return ({ result, update }) => {
            if (!result) return;

            update();

            if (result.type === 'success') {
                successMessage = isUpdateMode
                    ? 'Product updated!'
                    : 'Product created!';
                errors = {};
            } else if (result.type === 'failure') {
                errors = { ...result.data.errors };
            } else {
                errors = {};
            }
        };
    }

    function handleCancel() {
        errors = {};
        successMessage = '';
        onCancel?.();
    }
</script>

<!-- =========================
     Markup
========================== -->

<div id="product-form" class="card shadow-sm w-50">
    <div class="card-header bg-success text-white">
        <h2 class="h4 mb-0">{formTitle}</h2>
    </div>

    <div class="card-body">
        <form
            method="POST"
            action={isUpdateMode ? '?/updateProduct' : '?/createProduct'}
            use:enhance={enhanceProductForm}
            enctype="multipart/form-data"
        >
            {#if isUpdateMode}
                <input type="hidden" name="prodId" value={product.id} />
            {/if}

            <!-- Name -->
            <div class="mb-3">
                <label for="productName" class="form-label">
                    Name <span class="text-danger" aria-label="required">*</span>
                </label>
                <input
                    type="text"
                    class="form-control"
                    class:is-invalid={errors.name}
                    id="productName"
                    name="prodName"
                    bind:value={prodForm.prodName}
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? 'productName-error' : undefined}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    placeholder="Enter Product name"
                />
                {#if errors.name}
                    <div id="productName-error" class="form-text text-danger">
                        {errors.name}
                    </div>
                {/if}
            </div>

            <!-- Description -->
            <div class="mb-3">
                <label for="productDesc" class="form-label">
                    Description <span class="text-danger" aria-label="required">*</span>
                </label>
                <input
                    type="text"
                    class="form-control"
                    class:is-invalid={errors.description}
                    id="productDesc"
                    name="prodDesc"
                    bind:value={prodForm.prodDesc}
                    required
                    aria-required="true"
                    aria-describedby={errors.description ? 'productDesc-error' : undefined}
                    aria-invalid={errors.description ? 'true' : 'false'}
                    placeholder="Enter Description"
                />
                {#if errors.description}
                    <div id="productDesc-error" class="form-text text-danger">
                        {errors.description}
                    </div>
                {/if}
            </div>

            <!-- Price -->
            <div class="mb-3">
                <label for="productPrice" class="form-label">
                    Price <span class="text-danger" aria-label="required">*</span>
                </label>
                <input
                    type="number"
                    class="form-control"
                    class:is-invalid={errors.price}
                    id="productPrice"
                    name="prodPrice"
                    bind:value={prodForm.prodPrice}
                    required
                    aria-required="true"
                    aria-describedby={errors.price ? 'productPrice-error' : undefined}
                    aria-invalid={errors.price ? 'true' : 'false'}
                    placeholder="Enter Price"
                />
                {#if errors.price}
                    <div id="productPrice-error" class="form-text text-danger">
                        {errors.price}
                    </div>
                {/if}
            </div>

            <!-- Image for edit ONLY-->
            {#if isUpdateMode && product.image}
                <div class="mb-3">
                    <p class="form-label mb-1">Current Image</p>
                    <img src={`/uploads/${product.image}`} alt="Current product" class="img-thumbnail mb-2" style="max-width: 200px;"/>
                    <div class="form-text">
                        Choose a new image only if you want to replace it
                    </div>
                </div>
            {/if}
            <!-- Image for add -->
            <div class="mb-3">
                <label for="productImage" class="form-label">
                    Image <span class="text-danger" aria-label="required">*</span>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    class="form-control"
                    class:is-invalid={errors.image}
                    id="productImage"
                    name="prodImage"
                    required={!isUpdateMode}
                    aria-required="true"
                    aria-describedby={errors.image ? 'productImage-error' : undefined}
                    aria-invalid={errors.image ? 'true' : 'false'}
                    placeholder="Enter Image URL"
                />
                {#if errors.image}
                    <div id="productImage-error" class="form-text text-danger">
                        {errors.image}
                    </div>
                {/if}
            </div>

            <!-- Quantity -->
            <div class="mb-3">
                <label for="productQty" class="form-label">
                    Quantity <span class="text-danger" aria-label="required">*</span>
                </label>
                <input
                    type="number"
                    class="form-control"
                    class:is-invalid={errors.quantity}
                    id="productQty"
                    name="prodQty"
                    bind:value={prodForm.prodQty}
                    required
                    aria-required="true"
                    aria-describedby={errors.quantity ? 'productQty-error' : undefined}
                    aria-invalid={errors.quantity ? 'true' : 'false'}
                    placeholder="Enter Quantity"
                />
                {#if errors.quantity}
                    <div id="productQty-error" class="form-text text-danger">
                        {errors.quantity}
                    </div>
                {/if}
            </div>

            <!-- Category -->
            <div class="mb-3">
                <label for="productCatId" class="form-label">
                    Category Name <span class="text-danger" aria-label="required">*</span>
                </label>
                <select
                    class="form-select"
                    class:is-invalid={errors.categoryId}
                    id="productCatId"
                    name="prodCatId"
                    bind:value={prodForm.prodCatId}
                    required
                    aria-required="true"
                    aria-describedby={errors.categoryId ? 'productCatId-error' : undefined}
                    aria-invalid={errors.categoryId ? 'true' : 'false'}
                >
                    {#each categories as cat}
                        <option value={cat.id}>{cat.name}</option>
                    {/each}
                </select>
                {#if errors.categoryId}
                    <div id="productCatId-error" class="form-text text-danger">
                        {errors.categoryId}
                    </div>
                {/if}
            </div>

            <button type="submit" class="btn btn-success">
                <i class="bi bi-{isUpdateMode ? 'check' : 'plus'}-circle me-1"></i>
                {isUpdateMode ? 'Update Product' : 'Create Product'}
            </button>

            <button
                type="button"
                class="btn btn-secondary"
                onclick={handleCancel}
            >
                <i class="bi bi-x-circle me-1"></i>
                Cancel / Close
            </button>
        </form>
    </div>
</div>

{#if successMessage}
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
        <i class="bi bi-check-circle-fill me-2"></i>
        {successMessage}
        <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onclick={handleCancel}
        ></button>
    </div>
{/if}

{#if errors.general}
    <div class="alert alert-danger mt-3" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        {errors.general}
    </div>
{/if}