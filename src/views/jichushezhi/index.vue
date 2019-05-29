<template>
    <div class="jichushezhi">
       <is-admin-or-customer-manager></is-admin-or-customer-manager>
    </div>
</template>

<script>
import isAdminOrCustomerManager from './isAdminOrCustomerManager'


export default {
    components:{
        isAdminOrCustomerManager
    },
}
</script>


