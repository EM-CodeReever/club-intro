<script lang="ts">
  // import MessageCard from "../components/MessageCard.svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { enhance } from "$app/forms";
  import toast, { Toaster } from 'svelte-french-toast';
  let loading = false;
  let bool = true;
  export let data;
  let message: string;
  let name: string;
  function sendMessage(name: string, message: string) {
    if (!data.clientSocket) return;
    console.log(message);

    data.clientSocket.send(message);
  }

</script>
<Toaster />
<img
      src="/cs-logo.jpg"
      alt=""
      class="aspect-square w-32 lg:w-56 rounded-full mx-auto"
    />

    <h3 class="font-bold text-xl lg:text-2xl text-center mt-5 mb-5 lg:mb-10">
      Welcome the VTDI Computing Society Club
    </h3>

{#if bool}
  <div
    class="modal-box w-11/12 max-w-5xl m-auto"
    in:fly={{delay:500, y: 500, duration: 500, easing: quintOut }}
    out:fly={{ y: -500, duration: 500, easing: quintOut }}
  >
   
  <div class="font-semibold capitalize text-center text-lg">
    <p>We're thrilled to have you here! 😃</p>
    <p>Leave a message to pop up on our real-time message board!</p>
    <p>See you there! 🚀✨</p>
</div>
    
    <div class="grid grid-cols-2 gap-5 grid-flow-row">
      <div class="form-control col-span-2">
        <label class="label" for="textarea">
          <span class="label-text">Leave a message</span>
        </label>
        <input
          type="text"
          name="message"
          class="input input-bordered w-full col-span-1"
          bind:value={message}
        />
      </div>
      <button
        class="btn bg-[#094173] ml-auto col-span-full"
        on:click={() => {
          sendMessage(name, message);
        }}>Send Message</button
      >
    </div>
  </div>
  {:else}
  <div class="p-5 modal-box w-full max-w-5xl m-auto flex flex-col space-y-3"
  in:fly={{delay: 500, y: 500, duration: 500, easing: quintOut }}
  out:fly={{ y: -500, duration: 500, easing: quintOut }}
  >
    <h3 class="font-bold text-lg lg:text-2xl text-center mt-5 mb-10">
      Sign up for the VTDI Computing Society Club
    </h3>
      <form action="?/register" method="POST" class="flex flex-col space-y-3" use:enhance={()=>{
        loading = true;
        return ({result})=>{
          if(result.type == "success"){
            bool = true;
            loading = false;
            toast.success("Successfully Registered for the VTDI Computing Society Club!");
            data.clientSocket?.send(`/update-name:${name}`)
          }
        }
      }}>
        <input
          type="text"
          placeholder="Enter Name here"
          class="input input-bordered w-full col-span-1"
          name="name"
        />
        <input
          type="text"
          placeholder="Enter Email here"
          class="input input-bordered w-full col-span-2"
          name="email"
        />
        <input
          type="text"
          placeholder="Enter Phone Number"
          class="input input-bordered w-full col-span-2"
          name="phoneNumber"
        />
        <select class="select select-bordered w-full col-span-1" name="areaOfInterest">
          <option disabled selected>Pick your area of interest</option>
          <option>AI & Automation</option>
          <option>Design, Gaming and Animation</option>
          <option>Hardware, Networking and Information Security</option>
          <option>Software Development</option>
          <option>Photography</option>
        </select>
        <button class="btn m-auto bg-[#094173] {loading ? 'loading' : ''}" >Submit</button>
      </form>
  </div>
  
{/if}
<div class="flex justify-center mt-10">
  <button class="btn m-auto" on:click={()=>{bool = !bool}}>Join our Club</button>
</div>



