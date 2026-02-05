
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



<!-- icon that will change at some point-->
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


<!--this is the navbar-->
<nav class="navbar navbar-expand-lg navbar bg-body-tertiary p-3 mb-4">
  <div class="container-fluid px-2">
    <a class="navbar-brand" href="/">FitWorld</a>
    <div>

      <a class="nav-link d-inline mx-2" href="/">Home</a>
      <a class="nav-link d-inline mx-2" href="/browse">Browse</a>
      <a class="nav-link d-inline mx-2" href="/contact">Contact</a>

      <button 
        class="btn btn-outline-secondary  mx-2"
        on:click={toggleTheme}>{theme === "light" ? "Light" : "Dark"}
      </button>

    </div>
  </div>
</nav>


<!---renders page-->
<slot />
