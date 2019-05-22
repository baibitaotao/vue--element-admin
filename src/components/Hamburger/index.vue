<template>
  <div @click="toggleClick">
    <img v-if="!isActive" src="@/assets/layout/logo-shrink.png" alt="">
    <img v-if="isActive" src="@/assets/layout/logo-open.png" alt="">
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
</style>
