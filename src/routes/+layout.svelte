<script lang="ts">
    import type { LayoutData } from './$types';
    import '../app.css'
    import { onDestroy } from 'svelte';
    import { onNavigate } from '$app/navigation';
    export let data: LayoutData;



    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    onDestroy(() => {
        if (data.clientSocket) {
            //when person leave the site, close the socket
            data.clientSocket.close()
        }
    })
</script>
<section class="blob-scene-bg h-screen w-full py-10">

      <slot />
</section>


