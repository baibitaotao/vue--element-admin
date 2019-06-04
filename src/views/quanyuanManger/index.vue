<template>
    <div class="quanyuanManger">
        <quanyuan-manger></quanyuan-manger>
    </div>
</template>


<script>

import quanyuanManger from './adminOreditorComponent/quanyuanManger'
import {mapGetters} from 'vuex'
export default {
    components:{
       quanyuanManger
    },
    computed:{  
        ...mapGetters([
            'roles'
        ]),
        isShowAdminOrManger(){
            if(this.roles[0] === 'admin'){
                return 'admin'
            }
            else if(this.roles[0] === 'manger'){
                return 'manger'
            }
        }   
    },
 
}
</script>


