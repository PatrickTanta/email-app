<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import useKeydown from '../composables/use-keydown'

export default {
  setup (props, { emit }) {
    useKeydown([
      { key: 'Escape', fn: () => { emit('closeModal') } },
      { key: 'Enter', fn: () => console.log('Hi mom') },
      { key: 'a', fn: () => console.log('you press a') }
    ])
    return {
      emit
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card {
  border-radius: 20px;
}
</style>
