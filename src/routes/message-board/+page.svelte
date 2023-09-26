<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;

    let party_messages:string[] = [];

    let party_members: string[] = [];
    onMount(() => {

        if(data.clientSocket){
            data.clientSocket.addEventListener("message", (event) => {
                party_messages = [...party_messages, event.data] ;
          });
        }  
    });

     // listen to party's broadcasts (this.party.broadcast) from server
    
</script>

{#each party_messages as message}
    {message}
{/each}