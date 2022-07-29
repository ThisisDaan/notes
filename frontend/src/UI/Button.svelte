<script>
    export let className = ''
</script>

<button on:click class="transition-all duration-300 text-white font-medium flex space-x-2 items-center justify-center {className}">
    <slot />  
</button>