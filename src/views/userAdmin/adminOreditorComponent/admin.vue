<template>
    <div class="quanyuanMangerAdmin">              
        <coom-component></coom-component> 
    </div>
</template>

<script>
 import coomComponent from './coomComponent/index'
export default {
    components:{
        coomComponent,
    },
    data () {
        return {
           activeName:'first' 
        }
    },
    methods: {
      handleClick(){
          
      }  
    }
}
</script>
