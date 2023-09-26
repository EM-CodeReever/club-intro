<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import MessageCard from '../../components/MessageCard.svelte';
    import { browser } from '$app/environment';
    let disableAnimation = true;
    export let data: PageData;
    $:console.log(disableAnimation);
    
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

<div class="form-control absolute top-3 right-5">
    <label class="label cursor-pointer">
      <span class="label-text mr-3 ">Animation</span> 
      <input type="checkbox" class="toggle" bind:checked={disableAnimation} />
    </label>
  </div>

{#each party_messages as message}

    <MessageCard disableAnimation={!disableAnimation} message={message.split(":")[1]}/>

{/each}

