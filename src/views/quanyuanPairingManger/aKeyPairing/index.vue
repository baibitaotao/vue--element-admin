<template>
    <div class="appointmentPairing">
        <appointment-pairing-component :deviationData = 'deviationData' ref='appointmentPairingComponent'></appointment-pairing-component>
    </div>
</template>

<script>
import appointmentPairingComponent from './aKeyPairing/index'

export default {
    methods:{
        pairing(){
            if(this.deviationData.daysValue !== '' && this.deviationData.quantityValue !== '' && this.deviationData.rateValue !== ''){
                this.$refs.appointmentPairingComponent.pairing()
            }
        }
    },
    components:{
        appointmentPairingComponent,
    },
    data () {
        return {
            deviationData:{
                daysValue:'',
                quantityValue:'',
                rateValue:'',
            }
            
        }
    }


}

</script>


<style lang="scss" scoped>
    .deviationRate{
            display: flex;
        >div{
            margin-right:10px;
            display: flex;
             >span{
            margin-right:5px; 
            transform: translateY(5px);
            font-size: 12px;
        }
        }
       
    }



</style>


