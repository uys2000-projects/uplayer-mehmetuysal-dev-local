<template>
  <div class="h-page w-full">
    <video id="player" class="video-js h-full w-full" controls :src="src">
      <source :src="src" type="rtmp/flv" />
      <source :src="src" type="video/mp4" />
      <source :src="src" type="video/ogg">
      <source :src="src" type="video/webm">
      <source :src="src" type="rtmp/flv">
      <source :src="src">
    </video>
  </div>
</template>

<script lang="ts">
import "video.js/dist/video-js.css"
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';

export default {
  emits: ["error"],
  data() {
    return {
      player: null as null | Player
    }
  },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  methods: {
    createPlayer() {
      this.player = videojs("player", {
        autoplay: true,
        controls: true,
      })
      this.player.on("error", () => {
        this.destroyPlayer();
        this.$emit("error")
      })
      this.player.load();
      this.player.play();

    },
    destroyPlayer() {
      if (this.player) {
        this.player.dispose();
      }
    },
  },
  mounted() {
    this.createPlayer();
  },
  unmounted() {
    this.destroyPlayer()
  },
}
</script>
