<script>
  let exercises = [];

  async function loadExercises() {
    const res = await fetch('/api/workouts');
    exercises = await res.json();
  }
</script>

<button class="btn btn-success px-4 py-2 rounded-pill shadow-sm">
  <i class="bi bi-plus-circle me-2"></i>
  Add Meal
</button>

<ul>
  {#each exercises.slice(0, 10) as ex}
    <li>{ex.name} ({ex.target})</li>
  {/each}
</ul>