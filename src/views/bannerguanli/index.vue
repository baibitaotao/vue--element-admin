<template>
    <div class="bannerguanli">
       <coom-component></coom-component>
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
import coomComponent from './adminOreditorComponent/coomComponent/index'

export default {
    components:{
       coomComponent,
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


