<template>
    <div class="userAduitManger">
        <user-aduit-manger-componet></user-aduit-manger-componet>
    </div>
</template>


<script>

import userAduitMangerComponet from './adminOreditorComponent/userAduitMangerComponet'

export default {
    components:{
       userAduitMangerComponet
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
}
</script>


