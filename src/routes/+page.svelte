<script lang="ts">
    import MessageCard from "../components/MessageCard.svelte";
    import PfpCard from "../components/PFPCard.svelte";
    let messagesVisible = false;

    let my_modal_4 :HTMLDialogElement;

    export let data;
    
    let message: string
    

    function sendMessage(message: string){
      if (!data.clientSocket) return

      console.log(message);
      
      data.clientSocket.send(message)
    }

</script>

<section class="h-screen w-full flex justify-between pb-16 items-center flex-col bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
    <div class="navbar bg-neutral text-neutral-content">
        <p class="btn btn-ghost normal-case text-xl ">VTDI Computing Society</p>
      </div>

      <input type="text" name="message" class="input" bind:value={message}>
      <button class="btn btn-primary" on:click={()=>  {sendMessage(message)}}>Send Message</button>
      {#if !messagesVisible}
      <button class="btn-lg btn" on:click={()=> my_modal_4.showModal()}> Join Computing Society</button>
      <span>
        <!-- empty span center the button above -->
      </span>
        {/if}
        {#if messagesVisible}
        <div class="text-3xl text-white font-bold">Welcome Club Members</div>
        <div id="container" class="flex flex-col items-center space-y-6 justify-start overflow-y-scroll w-full max-w-2xl rounded-xl bg-gray-200 grid-flow-col relative p-10" style="height: 80%; background-color: rgba(0,0,0,0.5)">
            <MessageCard/>
            <MessageCard/>
            <MessageCard/>
            <MessageCard/>
            <MessageCard/>
            <MessageCard/>
            <MessageCard/>

        </div>
        {/if}
        <!-- <div class="w-full h-32 bg-gradient-to-t from-indigo-800 bottom-0 absolute"></div> -->
</section>


<!-- You can open the modal using ID.showModal() method -->
<dialog id="my_modal_4" class="modal" bind:this={my_modal_4}>
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg text-center mt-5 mb-10">Welcome the V.T.D.I Computing Society Club</h3>

        <div class="grid grid-cols-2 gap-5 grid-flow-row">
            <input type="text" placeholder="Enter name" class="input input-bordered w-full col-span-1" />
            <select class="select select-bordered w-full col-span-1">
                <option disabled selected>Pick your area of interest</option>
                <option>Svelte</option>
                <option>Vue</option>
                <option>React</option>
              </select>
            <input type="text" placeholder="Enter Email here" class="input input-bordered w-full col-span-2" />
            <div class="form-control col-span-2">
                <label class="label" for='textarea'>
                  <span class="label-text">Leave a message</span>
                </label>
                <textarea class="textarea textarea-bordered h-24" placeholder="Say Hi and something about yourself"></textarea>
              </div>
        </div>
        
        
        
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="btn btn-success" on:click={()=>{messagesVisible = true}}>Submit</button>
      </form>
    </div>
  </div>
</dialog>