import type { UPlayListItem } from "../types/playlist";
export const usePlaylistStore = defineStore("playlist", {
  state() {
    return {
      name: "",
      group: "all",
      playlist: [] as UPlayListItem[],
    };
  },
  getters: {},
});
