<script>
    export let type = ''
</script>

<button on:click class="text-white font-medium rounded-lg p-4 {type ? type : ''}">
    <slot />  
</button>