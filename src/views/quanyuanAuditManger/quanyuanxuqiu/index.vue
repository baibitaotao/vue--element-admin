<template>
    <div class="xuqiuAudit">
        <h4 style="marginBottom:30px;">券源需求审核</h4>
        <wait-audit></wait-audit>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import waitAudit from './xuqiuComent/waitAudit'


export default {
    components:{
        waitAudit,
    },
    methods: {
      handleClick(){}  
    }

}
</script>

