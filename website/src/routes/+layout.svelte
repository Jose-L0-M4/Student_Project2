<script>

import favicon from '$lib/assets/favicon.svg';


// onMount runs after the component is mounted to the DOM

// only runs in the browser, not SSR (server-side rendering)

import { onMount } from 'svelte';


// Browser used to test if client or server side

import { browser } from '$app/environment';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.min.css';


onMount( async () => {

if (browser) {

// if running in the browser, load Bootstrap

console.log("Loading Bootstrap");

await import('bootstrap');

}

})


let { children } = $props();

</script>


<svelte:head>

<link rel="icon" href={favicon} />

</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/browse">Browse</a>
	<a href="/contact">Contact</a>

</nav>

{@render children()}

