<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import MessageCard from '../../components/MessageCard.svelte';
    import { browser } from '$app/environment';
    
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
    let placeElementRandomly;
     if(browser){

function placeElementRandomly(element: HTMLElement) {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Calculate random X and Y coordinates within the page boundaries
    const randomX = Math.random() * (pageWidth - elementWidth);
    const randomY = Math.random() * (pageHeight - elementHeight);

    // Set the element's position
    element.style.position = 'absolute';
    element.style.left = `${randomX}px`;
    element.style.top = `${randomY}px`;
}

// Example usage:
// const yourElement = document.getElementById('message-card') as HTMLElement; // Replace with your element's actual ID
// placeElementRandomly(yourElement);
     } 
</script>

{#each party_messages as message}

    <MessageCard message={message.split(":")[1]}/>

{/each}

