<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import MessageCard from '../../components/MessageCard.svelte';
    import { browser } from '$app/environment';
    import type { Message } from '$lib/types';
    import { isCommandString } from '$lib/helpers';
    
    export let data: PageData;
    
    let party_messages: Message[] = [];

    let party_members: string[] = [];
    onMount(() => {

        if(data.clientSocket){
            data.clientSocket.addEventListener("message", (event) => {


              let message: string = event.data;
              if(isCommandString(message)){
                if(message.includes("/name-update:")){
                  let data = message.split(":")[1];
                  let connectionId = data.split("=")[0];
                  let name = data.split("=")[1];

                  //change sender name in party_messages
                  party_messages = party_messages.map((message) => {
                    if(message.sender.connectionId == connectionId){
                      message.sender.name = name;
                    }
                    return message;
                  });
                 
                }
          
              }else{
                party_messages = [...party_messages, JSON.parse(event.data)] ;
                console.log(party_messages);
              }
               
                
          });
        }  
    });

     // listen to party's broadcasts (this.party.broadcast) from server

</script>

{#each party_messages as message}

    <MessageCard message={message.message} name={message.sender.name ?? "John Doe"}/>

{/each}

