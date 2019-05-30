<template>
    <div class="gangweiguanli">
        <component :is="isShowAdminOrCustomManger"></component>
    </div>
</template>


<script>
export default {
    data () {
        return {
            isShowAdminOrCustomManger:'admin'
        }
    }
}
</script>



