<template>
    <div class="appointmentPairing">
        <div><el-button type="primary">一键配对</el-button></div>
        <appointment-pairing-component></appointment-pairing-component>
    </div>
</template>


<script>
import appointmentPairingComponent from './aKeyPairing/index'

export default {
    components:{
        appointmentPairingComponent,
    }


}

</script>


