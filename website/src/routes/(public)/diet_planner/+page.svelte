<script>
  let food = '';
  let meals = [];

  function addMeal() {
    if (food.trim() !== '') {
      meals = [...meals, food];
      food = '';
    }
  }

  function removeMeal(index) {
    meals.splice(index, 1);
    meals = [...meals];
  }
</script>

<div class="container mt-5">

  <!-- Title -->
  <h1 class="text-center mb-4">Diet Planner</h1>

  <!-- Input Section -->
  <div class="card p-4 shadow mb-4">
    <div class="d-flex gap-2">
      <input 
        type="text" 
        class="form-control"
        placeholder="Enter food (e.g. chicken, rice)"
        bind:value={food}
      />
      <button class="btn btn-success" on:click={addMeal}>
        Add
      </button>
    </div>
  </div>

  <!-- Meal List -->
  <div class="card p-4 shadow">
    <h4 class="mb-3">Your Meals</h4>

    {#if meals.length === 0}
      <p class="text-muted">No meals added yet</p>
    {/if}

    <ul class="list-group">
      {#each meals as meal, index}
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {meal}
          <button 
            class="btn btn-sm btn-danger"
            on:click={() => removeMeal(index)}
          >
            Remove
          </button>
        </li>
      {/each}
    </ul>
  </div>

</div>