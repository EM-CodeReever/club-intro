<script lang="ts">
    export let name = 'John Doe';
    let colors = ['red', 'gold', 'emerald', 'sky', 'indigo', 'purple', 'pink'];
    let uuid = Math.random().toString(36).substring(7);
    
    //create a function that return a random tailwind color string

</script>

<div class="message-card bg-gray-900 text-gray-600 w-full max-w-xl h-fit p-5 rounded-lg flex justify-start}">
    <div class={`w-20 h-20 flex-none rounded-lg bg-${colors[Math.floor(Math.random() * colors.length)]}-400 mr-5`}>
        <!-- wanted the background-color of each img to be different for the code above, but not working for some reason -->
        <img src={`https://robohash.org/${uuid}`} alt="">
    </div>
    <div class="text-gray-300">
        <h3><span class="font-bold">{name}</span> left this message: </h3>
        <p class="bg-gray-700 h-24 rounded-lg p-2 mt-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem sunt aut doloremque laborum eveniet cumque numquam magni.</p>
    </div>
 </div>
 
<style lang="scss">
    @keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px) ;
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-20px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}

@keyframes GFG {
            0% {
                transform: rotate(0deg) 
                    translateX(10px) rotate(0deg);
            }
            
            100% {
                transform: rotate(-360deg) 
                    translateX(10px) rotate(360deg);
            }
        }

.message-card {
        animation: float 6s ease-in-out infinite;
        animation: GFG 4s linear infinite;
    }

    @for $i from 1 through 10 {
    .message-card:nth-child(#{$i}) {
        animation-delay: #{$i * 1}s;
    }
}
</style>

