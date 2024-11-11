<template>
  <div class="collapse">
    <input type="checkbox" :checked="checked" />
    <div class="collapse-title">
      <slot name="title" />
    </div>
    <div class="collapse-content">
      <slot name="content" />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>