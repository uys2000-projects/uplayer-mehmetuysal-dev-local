<template>
  <div class="h-page w-full">
    <template v-if="loaded">
      <template v-if="isChannel">
        <SharedLivePlayer :src="url" />
      </template>
      <template v-else>
        <SharedPlayer :src="url" @error="() => isChannel = true" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import type { UPlayListItem } from '~/types/playlist';


export default {
  data() {
    return {
      playlistStore: usePlaylistStore(),
      isChannel: undefined as undefined | boolean,
      url: "",
      loaded: false
    }
  },
  methods: {
    isChannelUrl(url: string) {
      return url.search(/[.][^.\/]*$/) == -1;
    },
    async loadPlaylist() {
      const response = await useFetch<UPlayListItem[]>("/api/fileSystem", { method: "post", params: { function: "readFileObject" }, body: { path: "playlist" } })
      const playlist = response.data.value
      console.log(playlist)
      if (playlist) this.playlistStore.playlist = playlist;
    },
    async loadSource() {
      const line = this.$route.params.id
      const item = (await filterBatcher<UPlayListItem>(this.playlistStore.playlist, (item) => item.line == line ? item : undefined))
      console.log(item)
      this.url = item[0].url
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      if (this.playlistStore.playlist.length == 0) await this.loadPlaylist()
      await this.loadSource()
      this.isChannel = this.isChannelUrl(this.url)
      this.loaded = true
    }
  },
}
</script>