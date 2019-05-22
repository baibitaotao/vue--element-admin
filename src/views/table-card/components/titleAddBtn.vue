<template>
  <div>
    <div v-for="(item,index) in addBtnList" :key="index" class="add-btn" @click="clkCall(item.methods)">
      <i class="add-btn-i" :class="item.icon" />
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleAddBtn',
  props: ['addBtnList'],
  methods: {
    clkCall(methodsWords) {
      this.$emit('clkCallBk', methodsWords)
    }
  }
}
</script>
