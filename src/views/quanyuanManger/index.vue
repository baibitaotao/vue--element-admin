<template>
    <div class="quanyuanManger">
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


