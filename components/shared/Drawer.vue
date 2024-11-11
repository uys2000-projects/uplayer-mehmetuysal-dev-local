<template>
  <div class="drawer-side z-10">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-neutral min-h-full w-max p-4">
      <li>
        <RouterLink to="/" class="btn btn-neutral">UPlayer</RouterLink>
      </li>
      <li>
        <RouterLink to="/list" class="btn btn-neutral">Play List</RouterLink>
      </li>
      <li class="mt-auto">
        <RouterLink to="/about" class="btn btn-neutral">About</RouterLink>
      </li>
      <li>
        <RouterLink to="/settings" class="btn btn-neutral">Settings</RouterLink>
      </li>
    </ul>
  </div>
</template>
