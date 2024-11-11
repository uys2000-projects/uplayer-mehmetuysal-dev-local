<template>
  <div class="h-page w-full">
    <video id="player" class="h-full w-full" controls></video>
  </div>
</template>

<script lang="ts">
import Mpegts from "mpegts.js";
let type: "mse" | "mpegts" | "m2ts" | "flv" = "m2ts";

export default {
  data() {
    return {
      player: null as null | Mpegts.Player,
    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    posterUrl: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    createPlayer() {
      if (Mpegts.getFeatureList().mseLivePlayback && this.src) {
        const videElement = document.getElementById("player") as HTMLVideoElement
        this.player = Mpegts.createPlayer({
          type: type,
          isLive: true,
          url: this.src,
        });
        this.player.attachMediaElement(videElement);
        this.player.load();
        this.player.play();
      }
    },
    destroyPlayer() {
      if (this.player) {
        this.player.pause();
        this.player.unload();
        this.player.destroy();
      }
    }
  },
  mounted() {
    this.createPlayer()
  },
  unmounted() {
    this.destroyPlayer()
  }
}
</script>
