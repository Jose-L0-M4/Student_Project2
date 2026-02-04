<script>
import favicon from '$lib/assets/favicon.svg';
import { onMount } from 'svelte';
import { browser } from '$app/environment';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

onMount(async () => {
  if (browser) {
    console.log("Loading Bootstrap JS");
    await import('bootstrap');
  }
});
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-light bg-light p-3 mb-4">
  <div class="container">
    <a class="navbar-brand" href="/">FitWorld</a>
    <div>
      <a class="nav-link d-inline mx-2" href="/">Home</a>
      <a class="nav-link d-inline mx-2" href="/browse">Browse</a>
      <a class="nav-link d-inline mx-2" href="/contact">Contact</a>
    </div>
  </div>
</nav>


<!---renders page-->
<slot />
