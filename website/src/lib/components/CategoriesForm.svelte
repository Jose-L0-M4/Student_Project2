<script>
    import { enhance } from '$app/forms';

    /* =========================
       Props
    ========================== */
    let {
        category = null,     // null = add mode, object = update mode
        onCancel
    } = $props();

    /* =========================
       Derived state
    ========================== */
    let isUpdateMode = $derived(category != null);
    let formTitle = $derived(isUpdateMode ? 'Update Category' : 'Add New Category');

    /* =========================
       Local state
    ========================== */
    let errors = $state({});
    let successMessage = $state('');

    let catForm = $state({
        catName: '',
        catDesc: ''
    });

    /* =========================
       Sync category → form
    ========================== */
    $effect(() => {
        if (category) {
            catForm.catName = category.name ?? '';
            catForm.catDesc = category.description ?? '';
        } else {
            catForm.catName = '';
            catForm.catDesc = '';
        }
    });

    /* =========================
       enhance handler
    ========================== */
    function enhanceCategoryForm() {
        return ({ result, update }) => {
            if (!result) return;

            update();

            if (result.type === 'success') {
                successMessage = isUpdateMode
                    ? 'Category updated!'
                    : 'Category created!';
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

<div id="category-form" class="card shadow-sm w-50">
    <div class="card-header bg-success text-white">
        <h2 class="h4 mb-0">{formTitle}</h2>
    </div>

    <div class="card-body">
        <form
            method="POST"
            action={isUpdateMode ? '?/updateCategory' : '?/createCategory'}
            use:enhance={enhanceCategoryForm}
            enctype="multipart/form-data"
        >
            {#if isUpdateMode}
                <input type="hidden" name="catId" value={category.id} />
            {/if}

            <!-- Name -->
            <div class="mb-3">
                <label for="categoryName" class="form-label">
                    Name <span class="text-danger" aria-label="required">*</span>
                </label>
                <input
                    type="text"
                    class="form-control"
                    class:is-invalid={errors.name}
                    id="category"
                    name="catName"
                    bind:value={catForm.catName}
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? 'categoryName-error' : undefined}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    placeholder="Enter Category name"
                />
                {#if errors.name}
                    <div id="categoryName-error" class="form-text text-danger">
                        {errors.name}
                    </div>
                {/if}
            </div>

            <!-- Description -->
            <div class="mb-3">
                <label for="categoryDesc" class="form-label">
                    Description <span class="text-danger" aria-label="required">*</span>
                </label>
                <input
                    type="text"
                    class="form-control"
                    class:is-invalid={errors.description}
                    id="categoryDesc"
                    name="catDesc"
                    bind:value={catForm.catDesc}
                    required
                    aria-required="true"
                    aria-describedby={errors.description ? 'categoryDesc-error' : undefined}
                    aria-invalid={errors.description ? 'true' : 'false'}
                    placeholder="Enter Description"
                />
                {#if errors.description}
                    <div id="categoryDesc-error" class="form-text text-danger">
                        {errors.description}
                    </div>
                {/if}
            </div>

            <button type="submit" class="btn btn-success">
                <i class="bi bi-{isUpdateMode ? 'check' : 'plus'}-circle me-1"></i>
                {isUpdateMode ? 'Update Category' : 'Create Category'}
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