<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import MessageCard from '../../components/MessageCard.svelte';
    import { browser } from '$app/environment';
    import type { Message } from '$lib/types';
    
    export let data: PageData;
    let disableAnimation = true;
    $:console.log(disableAnimation);
    
    let party_messages: Message[] = [];

    let party_members: string[] = [];
    onMount(() => {

        if(data.clientSocket){
            data.clientSocket.addEventListener("message", (event) => {
                party_messages = [...party_messages, JSON.parse(event.data)] ;
                console.log(party_messages);
                
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

    <MessageCard disableAnimation={disableAnimation} message={message.message} name={message.sender.name ?? "John Doe"}/>

{/each}

