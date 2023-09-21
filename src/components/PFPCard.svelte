<div class="message-card w-20 h-20 flex-none rounded-lg bg-gray-700 mr-5" style="box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);">
    <img src="https://robohash.org/cool" alt="">
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

//     @for $i from 1 through 10 {
//     .message-card:nth-child(#{$i}) {
//         animation-delay: #{$i * 0.5}s;
//     }
// }

</style>