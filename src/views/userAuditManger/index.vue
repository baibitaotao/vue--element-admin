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
             "accountFlag": 1,
             "approveStatus": "01",
             "createDtBegin": "2019-05-10",
             "createDtEnd": "2019-05-20",
             "currPage": 1,
             "keyWord": 17712678377,
             "order": 1,
             "pageSize": 10,
             "registerType": "01",
             "sort": 1
            }
    this.$store.dispatch('userAuditManger/userApproval',data)     
    },
    computed:{
        ...mapGetters([
            'roles'
        ]),
        isShowAdminOrEditor(){
            if(this.roles[0] === 'admin'){
                return 'admin'
            }
            else {
                return 'admin'
            }
        }   
    }
}
</script>


