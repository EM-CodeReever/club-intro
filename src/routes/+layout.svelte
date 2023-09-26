<script lang="ts">
    import type { LayoutData } from './$types';
    import '../app.css'
    import { onDestroy } from 'svelte';
    export let data: LayoutData;


    onDestroy(() => {
        if (data.clientSocket) {
            //when person leave the site, close the socket
            data.clientSocket.close()
        }
    })
</script>
<slot />