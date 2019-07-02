<template>
    <div class="xuqiuAudit">
        <h4 style="marginBottom:30px;">券源供给审核</h4>
        <wait-audit></wait-audit>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import waitAudit from './gonjiComent/waitAudit'


export default {
    components:{
        waitAudit,
    },
    methods: {
      handleClick(){}  
    }

}
</script>



