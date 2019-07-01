<template>
    <div class="xuqiuAudit">
        <h4 style="marginBottom:30px;">券源供给审核</h4>
        <wait-audit :whoLogin = 'whoLogin'></wait-audit>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import waitAudit from './gonjiComent/waitAudit'


export default {
    data () {
        return {
        whoLogin:'admin'      
        }
    },
    components:{
        waitAudit,
    },
    methods: {
      handleClick(){}  
    }

}
</script>



