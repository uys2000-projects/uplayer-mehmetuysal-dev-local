<template>
  <div class="dropdown">
    <div :tabindex="index" class="h-full w-full">
      <slot name="title" />
    </div>
    <slot name="content" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>