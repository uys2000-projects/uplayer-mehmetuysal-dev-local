<template>
  <div class="h-app-page flex flex-col gap-4 p-4 h-full w-full overflow-hidden" :class="{ 'pb-12': appStore.adLoaded }">
    <label class="input input-bordered flex items-center gap-2 flex-shrink-0">
      Name:
      <input type="text" class="grow" v-model="searchName" @input="() => onFilterChange()" />
    </label>
    <select class="select select-bordered w-full flex-shrink-0 wide:flex-shrink" placeholder="Select Group"
      v-model="searchGroup" @change="() => onFilterChange()">
      <option value="all" selected>All Groups</option>
      <template v-for="group in groups">
        <option :value="group">{{ group }}</option>
      </template>
    </select>
    <RecycleScroller class="scroller" :items="playlist" :item-size="124" key-field="line" v-slot="{ item }">
      <div class="h-[124px] p-1 overflow-hidden">
        <div class="h-full flex items-center gap-4 overflow-hidden border border-neutral rounded-box">
          <div class="h-full w-32 flex overflow-hidden relative">
            <template v-if="item.img">
              <img class="h-full w-auto m-auto cursor-pointer" :src="item.img" alt="" :key="item.line" loading="lazy"
                @click="() => openImage(item.img)">
            </template>
            <template v-else>
              <img class="h-full w-auto m-auto" src="/404.jpeg" alt="" :key="item.line" loading="lazy">
            </template>
          </div>
          <div>
            {{ item.name }}
          </div>
          <div class="ml-auto">
            <a class="material-symbols-outlined cursor-pointer select-none" :href="item.url" target="_BLANK">
              download
            </a>
          </div>
          <div class="mr-4">
            <RouterLink :to="`/player/${item.line}`">
              <span class="material-symbols-outlined cursor-pointer select-none">
                play_arrow
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </RecycleScroller>

    <dialog id="modal" class="modal">
      <div class="modal-box">
        <img :src="image" alt="">
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import type { UPlayListItem } from "../types/playlist";
import { RecycleScroller, DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import { RouterLink } from 'vue-router';

export default {
  components: { RecycleScroller, DynamicScroller, DynamicScrollerItem },
  data() {
    return {
      searchName: "",
      searchGroup: "all",
      timer: 0,
      notFound: false,
      appStore: useAppStore(),
      playlistStore: usePlaylistStore(),
      playlist: [] as UPlayListItem[],
      image: ""
    };
  },
  methods: {
    openImage(image: string) {
      this.image = image
      const dialog = document.querySelector("#modal") as HTMLDialogElement
      dialog.show()
    },
    async loadPlaylist() {
      const response = await useFetch<UPlayListItem[]>("/api/fileSystem", { method: "post", params: { function: "readFileObject" }, body: { path: "playlist" } })
      const playlist = response.data.value
      if (!playlist) return this.notFound = true;
      this.playlistStore.playlist = playlist;
      this.playlist = this.playlistStore.playlist
    },
    async onFilterChange() {
      if (this.timer) clearTimeout(this.timer);
      setTimeout(async () => {
        if (this.searchGroup.trim() != "" || this.searchName.trim() != "") {
          this.playlist = await filterBatcher(this.playlistStore.playlist, item => {
            const isAll = this.searchGroup == "all"
            const isSelectedGroup = this.searchGroup == item.group
            const isSearchNameIncluded = item.name.toLocaleLowerCase().includes(this.searchName.toLocaleLowerCase())
            if ((isAll || isSelectedGroup) && isSearchNameIncluded) return item
            return undefined
          })
        }
      }, 1000);
    },
  },
  computed: {
    groups() {
      const groups = [... new Set(this.playlistStore.playlist.map(i => i.group))]
      return groups
    },
  },
  mounted() {
    this.searchName = this.playlistStore.name
    this.searchGroup = this.playlistStore.group
    if (this.playlistStore.playlist.length == 0) this.loadPlaylist();
    else this.playlist = this.playlistStore.playlist
    this.onFilterChange()
  },
  beforeUnmount() {
    this.playlistStore.name = this.searchName
    this.playlistStore.group = this.searchGroup
  },
};
</script>
