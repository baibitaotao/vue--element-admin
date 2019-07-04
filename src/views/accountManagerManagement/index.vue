<template>
    <div>
        客户经理管理
    </div>
</template>


<script>


export default {
    mounted () {
        // this.$store.dispatch('user/setRoles',this.setRoles())
    },
    methods: {
        setRoles(){
         let role   
         this.$route.matched.forEach(item => {
               if(item.meta.roles){
                   role = item.meta.roles
               }
           })
           return role
        }
       
    }

}



</script>




