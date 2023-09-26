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
<section class="blob-scene-bg h-screen w-full flex pb-16 items-center flex-col ">
    <div class="navbar bg-neutral text-neutral-content">
        <p class="btn btn-ghost normal-case text-xl ">VTDI Computing Society</p>
      </div>
      <slot />
</section>


