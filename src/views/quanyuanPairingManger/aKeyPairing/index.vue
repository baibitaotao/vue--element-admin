<template>
    <div class="appointmentPairing">
        <div style="display:flex">
        <div class="deviationRate">
        <div>
            <span>交易天数偏差率(%)</span>
            <el-input
                size="mini"
                style="width:auto;"
                placeholder="请输入交易天数偏差率"
                v-model="deviationData.daysValue">
            </el-input>
        </div>
        <div>
            <span>交易数量偏差率(%)</span>
            <el-input
                style="width:auto;"
                size="mini"
                placeholder="请输入交易数量偏差率"
                v-model="deviationData.quantityValue">
            </el-input></div>
        <div>
            <span>交易利率偏差率(%)</span>
            <el-input
                size="mini"
                style="width:auto;"
                placeholder="请输入交易利率偏差率"
                v-model="deviationData.rateValue">
            </el-input></div>
            </div><el-button type="danger" size="mini" @click="pairing">一键配对</el-button></div>
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


