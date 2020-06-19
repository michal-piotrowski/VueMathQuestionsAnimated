<template>

    <div @click="emitNewGame" 
        style="width:100%; 
               height:400px; 
               background:darkcyan;
               display:flex;
               justify-content:center;
               align-items:center;
               border-radius:12px">
        <div style="font-family: Helvetica; 
                    text-align:center;
                    box-shadow:0 0 0 5px white;
                    border-radius: 5px; 
                    border: 5px solid darkcyan; 
                    background: white;
                    color: darkcyan;
                    font-weight: bold;
                    cursor:pointer;
                    margin:20px;
                    padding:30px;
                    font-size:40pt"
                    >
            Click me to start<br>a new Game
        </div>
    </div>
</template>

<script>
import eventBus from './main';

export default {
    
    methods: {
        enterWait(el) {
            console.log('enterwait')
            setTimeout(() => {

            }, 1000)
        },
        emitNewGame() {
            eventBus.$emit('newGame')
        }
    }
}
</script>

<style>
div {
    animation-duration: 0.5s
}
</style>