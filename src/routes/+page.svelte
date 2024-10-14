<script>
  import Navbar from '$lib/Navbar.svelte'
  import Footer from '$lib/Footer.svelte'

  import '../app.css';

  
</script>

<Navbar />

<section class="bg-white dark:bg-gray-900">
    <div class="py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
      <div class="inline-flex items-center py-1 px-3 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
        <span class="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">Welcome to the</span> 
        <span class="text-sm font-medium">MVP Blockchain Wallet</span> 
      </div>
      <h1 class="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Secure Your Crypto with MVP Wallet</h1>
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Visit <a href="https://neucron.io/" class="underline text-blue-600 dark:text-blue-400">yourwebsite.com</a> to learn more and read the documentation</p>
      <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <a href="https://neucron.io/" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
          Learn more
          <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
        <a href="https://neucron.io/" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-gray-900 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          Documentation
        </a>  
      </div>
      <div class="grid gap-8 lg:grid-cols-3">
        <div class="text-left">
          <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">User-Friendly Interface</h2>
        </div>
        <div class="text-center">
          <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white"> Security </h2>
        </div>
        <div class="text-left">
          <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">24/7 Customer Support</h2>
        </div>
      </div>
    </div>
  </section>
  <Footer />
  