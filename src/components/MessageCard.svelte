<script lang="ts">
    import { browser } from "$app/environment";
    import { draggable } from "@neodrag/svelte";
    import type { DragOptions } from "@neodrag/svelte";

    export let name = "John Doe";
    export let message: string;

    let mousedown = false;
    let options: DragOptions = {
        bounds: "parent",
    };
    let y = Math.floor(Math.random() * 80) + "vh";
    let x = Math.floor(Math.random() * 81) + "vw";
    let colors = [
        "bg-red-400",
        "bg-gold-400",
        "bg-emerald-400",
        "bg-sky-400",
        "bg-indigo-400",
        "bg-purple-400",
        "bg-pink-400",
    ];
    let uuid = Math.random().toString(36).substring(7);
    // Get a reference to the div element

    // Function to handle mouseup event
    function handleMouseUp(event: MouseEvent) {
        if (browser) {
            const myDiv = document.getElementById("message-card");
            // Get the position and dimensions of the div
            const divRect = myDiv?.getBoundingClientRect();

            // Calculate right and bottom values
            const rightValue = window.innerWidth - divRect!.right;
            const bottomValue = window.innerHeight - divRect!.bottom;

            // Log or use the values as needed
            console.log(`Right: ${rightValue}px, Bottom: ${bottomValue}px`);
            x = rightValue + "px";
            y = bottomValue + "px";

            mousedown = false;
        }
    }
</script>

<diV
    on:mouseup={handleMouseUp}
    on:mousedown={() => {
        mousedown = true;
    }}
    use:draggable={{ axis: "both" }}
    id="message-card"
    class="{mousedown
        ? ''
        : 'message-card'} bg-gray-900 text-gray-600 w-fit h-fit p-5 rounded-lg flex justify-start absolute"
    style="bottom: {y}; left: {x};"
>
    <div
        class="w-20 h-20 flex-none rounded-lg {colors[
            Math.floor(Math.random() * colors.length)
        ]} mr-5"
    >
        <img src={`https://robohash.org/${uuid}`} alt="" />
    </div>
    <div class="text-gray-300">
        <h3><span class="font-bold">{name}</span> left this message:</h3>
        <p class="bg-gray-700 h-fit rounded-lg p-2 mt-3">{message}</p>
    </div>
</diV>

<style lang="scss">
    @keyframes float {
        0% {
            box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
            transform: translatey(0px);
        }
        50% {
            box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
            transform: translatey(-20px);
        }
        100% {
            box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
            transform: translatey(0px);
        }
    }

    @keyframes GFG {
        0% {
            transform: rotate(0deg) translateX(10px) rotate(0deg);
        }

        100% {
            transform: rotate(-360deg) translateX(10px) rotate(360deg);
        }
    }

    @keyframes crescendo {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.1);
        }
    }

    .message-card {
        animation: float 6s ease-in-out infinite;
        animation: GFG 4s linear infinite;
        // animation: crescendo 3s alternate ease-in-out infinite;
    }
</style>
