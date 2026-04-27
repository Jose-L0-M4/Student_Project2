<!-- Old One 
 
<script>
  
  import favicon from '$lib/assets/favicon.svg';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap-icons/font/bootstrap-icons.min.css';


  // vars 
  let theme



  // on mount stuff here
  onMount(() => {
    if (browser) {
      theme = document.documentElement.getAttribute("data-bs-theme");
    }
  });


  onMount(async () => {
    if (browser) {
      console.log("Loading Bootstrap JS");
      await import('bootstrap');
    }
  });
 

  onMount(() => {
    
  });

  

  // functions go here
  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme)

  }

</script>



<!- icon that will change at some point>
<svelte:head>
  <link rel="icon" href={favicon} />


  <script>
    //aplay theme
    (function() {
      try {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = stored || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-bs-theme", theme);
      } catch(e) {}
    })();
  </script>


</svelte:head>


<!-this is the navbar>
<nav class="navbar navbar-expand-lg navbar bg-body-tertiary p-3 mb-4">
  <div class="container-fluid px-2">
    <a class="navbar-brand" href="/">FitWorld</a>
    <div>

      <a class="nav-link d-inline mx-2" href="/">Home</a>
      <a class="nav-link d-inline mx-2" href="/LogIn">Log In</a>
      <a class="nav-link d-inline mx-2" href="/SignUp">Sign Up</a>
      <a class="nav-link d-inline mx-2" href="/browse">Browse</a>
      <a class="nav-link d-inline mx-2" href="/diet_planner">Diet Planner</a>
      <a class="nav-link d-inline mx-2" href="/workout_planner">Workout Planner</a>
      <a class="nav-link d-inline mx-2" href="/contact">Contact</a>

      <button 
        class="btn btn-outline-secondary  mx-2"
        on:click={toggleTheme}>{theme === "light" ? "Light" : "Dark"}
      </button>

    </div>
  </div>
</nav>


<!-renders page>
<slot />
-->

<!-- second old version
<script>
  import favicon from '$lib/assets/favicon.svg';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap-icons/font/bootstrap-icons.min.css';

  let theme = "light";
  let menuOpen = false;

  onMount(async () => {
    if (browser) {
      theme = document.documentElement.getAttribute("data-bs-theme") || "light";
      await import('bootstrap');
    }
  });

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

-- NAVBAR --
<nav class="navbar bg-body-tertiary px-3 shadow-sm">

  -- LEFT: Menu + Logo --
  <div class="d-flex align-items-center">
    -- svelte-ignore a11y_consider_explicit_label --
    <button class="btn me-2" on:click={toggleMenu} aria-label="Toggle menu">
      <i class="bi bi-list fs-4"></i>
    </button>

    <a class="navbar-brand fw-bold" href="/">FitWorld</a>
  </div>

  -- RIGHT: Icons --
  -- RIGHT: Icons --
<div class="d-flex align-items-center gap-2">

  {#if data?.user}

    <div class="dropdown">
      <button class="btn dropdown-toggle" data-bs-toggle="dropdown">
        <i class="bi bi-person-circle fs-5"></i>
      </button>

      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <a class="dropdown-item" href="/account">Profile</a>
        </li>

        <li><hr class="dropdown-divider" /></li>

        <li>
          <form method="post" action="/auth/logout">
            <button class="dropdown-item text-danger" type="submit">
              Logout
            </button>
          </form>
        </li>
      </ul>
    </div>

  {:else}

    <a href="/login" class="btn" aria-label="Log in">
      <i class="bi bi-person-circle fs-5"></i>
    </a>

  {/if}

  <button class="btn btn-outline-secondary" on:click={toggleTheme}>
    <i class="bi bi-moon"></i>
  </button>

</div>
    -- svelte-ignore a11y_consider_explicit_label --
    <a href="/auth/login" class="btn">
      <i class="bi bi-person-circle fs-5"></i>
    </a>

    -- svelte-ignore a11y_consider_explicit_label --
    <button 
      class="btn btn-outline-secondary"
      on:click={toggleTheme}
    >
      <i class="bi bi-moon"></i>
    </button>

</nav>

-- SIDEBAR --
{#if menuOpen}
  -- Overlay --
  -- svelte-ignore a11y_click_events_have_key_events --
  -- svelte-ignore a11y_no_static_element_interactions --

  <div 
    class="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
    style="z-index: 1040;"
    on:click={toggleMenu}
  ></div>

  -- Sidebar --
  <div 
    class="position-fixed top-0 start-0 vh-100 bg-body-tertiary shadow p-3"
    style="width: 250px; z-index: 1050;"
  >
    <h5 class="mb-4">Menu</h5>

    <a class="nav-link mb-2" href="/">🏠 Home</a>
<a class="nav-link mb-2" href="/browse">🔍 Browse</a>
<a class="nav-link mb-2" href="/diet_planner">🥗 Diet Planner</a>
<a class="nav-link mb-2" href="/workout_planner">🏋️ Workout Planner</a>

<a class="nav-link mb-2" href="/products">🛒 Shop</a>
<a class="nav-link mb-2" href="/orders">📦 My Orders</a>
<a class="nav-link mb-2" href="/categories">📂 Explore Categories</a>

<a class="nav-link mb-2" href="/contact">📩 Contact</a>

    <hr />

					
  </div>
{/if}


-- Page Content --
<slot /> -->

<!-- Third version -->
<<<<<<< HEAD
 <script>
=======

<script>
>>>>>>> 5be5ac2 (Another Start)
  import favicon from '$lib/assets/favicon.svg';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap-icons/font/bootstrap-icons.min.css';

<<<<<<< HEAD
  export let data; // ✅ user from +layout.server

  let theme = 'light';
  let menuOpen = false;

=======
  // Props
  export let data;

  // State
  let theme = 'light';
  let menuOpen = false;

  // Lifecycle
>>>>>>> 5be5ac2 (Another Start)
  onMount(async () => {
    if (browser) {
      theme =
        document.documentElement.getAttribute('data-bs-theme') || 'light';
<<<<<<< HEAD
=======

>>>>>>> 5be5ac2 (Another Start)
      await import('bootstrap');
    }
  });

<<<<<<< HEAD
  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
=======
  // Actions
  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';

>>>>>>> 5be5ac2 (Another Start)
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<!-- NAVBAR -->
<nav class="navbar bg-body-tertiary px-3 shadow-sm">

  <!-- LEFT -->
  <div class="d-flex align-items-center">
<<<<<<< HEAD
    <button class="btn me-2" on:click={toggleMenu} aria-label="Toggle menu">
      <i class="bi bi-list fs-4"></i>
    </button>

    <a class="navbar-brand fw-bold" href="/">FitWorld</a>
=======
    <button
      class="btn me-2"
      on:click={toggleMenu}
      aria-label="Toggle menu"
    >
      <i class="bi bi-list fs-4"></i>
    </button>

    <a class="navbar-brand fw-bold" href="/">
      FitWorld
    </a>
>>>>>>> 5be5ac2 (Another Start)
  </div>

  <!-- RIGHT -->
  <div class="d-flex align-items-center gap-2">

    {#if data?.user}

      <!-- USER DROPDOWN -->
      <div class="dropdown">
        <button class="btn dropdown-toggle" data-bs-toggle="dropdown">
          <i class="bi bi-person-circle fs-5"></i>
          {data.user.name}
        </button>

        <ul class="dropdown-menu dropdown-menu-end">
          <li>
<<<<<<< HEAD
            <a class="dropdown-item" href="/account">👤 Profile</a>
          </li>

          <li><hr class="dropdown-divider" /></li>

          <li>
            <form method="post" action="/auth/logout">
              <button class="dropdown-item text-danger" type="submit">
=======
            <a class="dropdown-item" href="/account">
              👤 Profile
            </a>
          </li>

          <li>
            <hr class="dropdown-divider" />
          </li>

          <li>
            <form method="post" action="/auth/logout">
              <button
                class="dropdown-item text-danger"
                type="submit"
              >
>>>>>>> 5be5ac2 (Another Start)
                🚪 Logout
              </button>
            </form>
          </li>
        </ul>
      </div>

    {:else}

      <!-- LOGIN -->
<<<<<<< HEAD
      <a href="/auth/login" class="btn" aria-label="Log in">
=======
      <a
        href="/auth/login"
        class="btn"
        aria-label="Log in"
      >
>>>>>>> 5be5ac2 (Another Start)
        <i class="bi bi-person-circle fs-5"></i>
      </a>

    {/if}

    <!-- THEME -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
<<<<<<< HEAD
    <button class="btn btn-outline-secondary" on:click={toggleTheme}>
=======
    <button
      class="btn btn-outline-secondary"
      on:click={toggleTheme}
    >
>>>>>>> 5be5ac2 (Another Start)
      <i class="bi bi-moon"></i>
    </button>

  </div>
</nav>

<!-- SIDEBAR -->
{#if menuOpen}

<<<<<<< HEAD
  <!-- overlay -->
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div 
    class="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
    style="z-index: 1040;" 
    on:click={toggleMenu}
    on:keydown={(e) => (e.key === 'Escape' && toggleMenu())}
=======
  <!-- OVERLAY -->
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
    style="z-index: 1040;"
    on:click={toggleMenu}
    on:keydown={(e) => e.key === 'Escape' && toggleMenu()}
>>>>>>> 5be5ac2 (Another Start)
    role="button"
    tabindex="0"
    aria-label="Close menu"
  ></div>
<<<<<<< HEAD
  

  <!-- panel -->
=======

  <!-- PANEL -->
>>>>>>> 5be5ac2 (Another Start)
  <div
    class="position-fixed top-0 start-0 vh-100 bg-body-tertiary shadow p-3"
    style="width: 260px; z-index: 1050;"
  >
    <h5 class="mb-4">Menu</h5>

<<<<<<< HEAD
=======
    <!-- MAIN LINKS -->
>>>>>>> 5be5ac2 (Another Start)
    <a class="nav-link mb-2" href="/">🏠 Home</a>
    <a class="nav-link mb-2" href="/browse">🔍 Browse</a>
    <a class="nav-link mb-2" href="/diet_planner">🥗 Diet Planner</a>
    <a class="nav-link mb-2" href="/workout_planner">🏋️ Workout Planner</a>

    <hr />

<<<<<<< HEAD
=======
    <!-- SHOP -->
>>>>>>> 5be5ac2 (Another Start)
    <a class="nav-link mb-2" href="/products">🛒 Shop</a>
    <a class="nav-link mb-2" href="/orders">📦 My Orders</a>
    <a class="nav-link mb-2" href="/categories">📂 Categories</a>

<<<<<<< HEAD
    <hr />

    <a class="nav-link mb-2" href="/contact">📩 Contact</a>
=======
    {#if data.user && data.cartCount > 0}
      <a class="nav-link mb-2" href="/cart">
        <i class="bi bi-cart me-1"></i>
        Cart ({data.cartCount})
      </a>
    {/if}

    <hr />

    <!-- EXTRA -->
    <a class="nav-link mb-2" href="/contact">📩 Contact</a>
    <a class="nav-link mb-2" href="/review">⭐ Reviews</a>
>>>>>>> 5be5ac2 (Another Start)
  </div>

{/if}

<<<<<<< HEAD
<!-- PAGE -->
=======
<!-- PAGE CONTENT -->
>>>>>>> 5be5ac2 (Another Start)
<slot />