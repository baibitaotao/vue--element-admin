<template>
  <div @click="toggleClick">
    <!-- <img v-if="!isActive" src="@/assets/layout/logo-shrink.png" alt="">
    <img v-if="isActive" src="@/assets/layout/logo-open.png" alt=""> -->
    <span class="header-title" style="fontFamily:'DFKai-SB'">券源后台管理系统</span>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  height:32px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}

.header-title{
    font-size: 22px;
    color: #000;
    font-weight: 700;
  
  }
</style>
