<script lang="ts">
  // import MessageCard from "../components/MessageCard.svelte";
  import PfpCard from "../components/PFPCard.svelte";
  let messagesVisible = false;

  let my_modal_4: HTMLDialogElement;

  export let data;

  let message: string;
  let name: string;
  let email: string;
  let clubMember: null;

  function sendMessage(name: string, message: string) {
    if (!data.clientSocket) return;
    console.log(message);

    data.clientSocket.send(message);
  }
</script>

<div class="modal-box w-11/12 max-w-5xl m-auto">
  <h3 class="font-bold text-lg lg:text-2xl text-center mt-5 mb-10">
    Welcome the V.T.D.I. Computing Society Club
  </h3>
  <img
    src="/cs-logo.jpg"
    alt=""
    class="aspect-square w-56 rounded-full mx-auto mb-10"
  />
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
      class="btn  bg-[#094173] ml-auto col-span-full"
      on:click={() => {
        sendMessage(name, message);
      }}>Send Message</button
    >
  </div>

</div>
  
<button class="btn">Join our Club</button>

<!-- You can open the modal using ID.showModal() method -->
<dialog id="my_modal_4" class="modal" bind:this={my_modal_4} />
<div class="modal-action">

</div>




<div class="hidden">
  <input
      type="text"
      placeholder="Enter name"
      class="input input-bordered w-full col-span-1"
      bind:value={name}
    />
    <select class="select select-bordered w-full col-span-1">
      <option disabled selected>Pick your area of interest</option>
      <option>Svelte</option>
      <option>Vue</option>
      <option>React</option>
    </select>
    <input
      type="text"
      placeholder="Enter Email here"
      class="input input-bordered w-full col-span-2"
      bind:value={email}
    />
</div>

<style>
</style>
