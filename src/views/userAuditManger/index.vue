<template>
    <div class="userAduitManger">
        <componet :is = 'isShowAdminOrEditor'></componet>
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
import admin from './adminOreditorComponent/admin'
import editor from './adminOreditorComponent/editor'
export default {
    components:{
       admin,
       editor 
    },
    mounted () {
        let data = {
             "accountFlag": '',
             "approveStatus": "01",
             "createDtBegin": "",
             "createDtEnd": "",
             "currPage": 1,
             "keyWord": 17712678377,
             "pageSize": 5,
             "registerType": "",
            }
    },
    computed:{
        ...mapGetters([
            'roles'
        ]),
        isShowAdminOrEditor(){
            if(this.roles[0]){
                return 'admin'
            }
            else {
                return 'admin'
            }
        }   
    },
  
}
</script>


