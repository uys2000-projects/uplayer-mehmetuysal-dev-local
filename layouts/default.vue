<template>
  <div class="drawer lg:drawer-open bg-base-300 text-base-content overflow-hidden">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <SharedHeader />
      <div class="h-app-page overflow-hidden relative">
        <slot />
      </div>
    </div>
    <SharedDrawer />
  </div>
</template>

<style>
.app-enter-active,
.app-leave-active {
  transition: 0.5s ease;
  position: absolute;
}

.app-enter-from {
  transform: translateX(100vw);
  opacity: 0;

}

.app-leave-to {
  transform: translateX(-100vw);
  opacity: 0;
}
</style>