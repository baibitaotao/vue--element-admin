<template>
    <div class="xuqiuPairing">
        <div style="width:410px">
         <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
         </el-input>
        </div>
        <div>
            <chujie></chujie>
        </div>
        <div>
            <pairing-table></pairing-table>
        </div>

    </div>
</template>

<script>
 import chujie from '../../../aacoment/chujie'
 import pairingTable from './table/table'
 

export default {
    data () {
        return {
            input3:''      
        }
    },
    components:{
      chujie,
      pairingTable 
    }
}
</script>

