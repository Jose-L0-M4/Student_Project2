<script>
    import items from '$lib/assets/data/items.json';

</script>

<div class="container text-center mt-5 ">
  <h1>Browse</h1>

  
  <div class="row justify-content-center">

    {#each items as item}
    <div class="col-4 d-flex justify-content-center">

      <a href={item.link} class="text-decoration-none">
        <div class="card text-bg-primary mb-3" style="max-width: 18rem;">
          <div class="card-header">{item.name}</div>
          
          <div class="card-body">
            <img src={item.image} class="img-fluid" alt={item.name}/>
            <p class="card-text">{item.desc}</p>
          </div>
        </div>
      </a>
    </div>
  {/each}

  </div>

  
</div>


