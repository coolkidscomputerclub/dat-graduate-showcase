<template>
  <img
    ref="sprite"
    class="lazyload"
    :src="sprite.src"
    :srcset="`${placeholder} 1w`"
    :data-srcset="sprite.srcset"
    :sizes="`${frameCount * 215}px`"
    :alt="sprite.alt"
    :width="frameCount * 215"
    height="200"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script>
import Lemonade from '~/assets/js/lemonade';
import { TRANSPARENT_PNG as placeholder } from '~/assets/js/images';

const DEFAULT_OPTIONS = {
  frameRate: 12,
  frameWidth: 215,
  frameHeight: 215,
  waitForImage: false,
};

export default {
  props: {
    sprite: {
      type: Object,

      required: true,
    },

    frameCount: {
      type: Number,

      required: true,
    },

    options: {
      type: Object,

      default: () => DEFAULT_OPTIONS,
    },
  },

  data() {
    return {
      placeholder,
    };
  },

  mounted() {
    this.lemonade = new Lemonade(this.$refs.sprite, {
      frameCount: this.frameCount,
      ...this.options,
    });

    this.lemonade.init();
  },

  destroyed() {
    this.lemonade.destroy();
  },

  methods: {
    handleMouseEnter() {
      this.lemonade.start();
    },

    handleMouseLeave() {
      this.lemonade.stop().reset();
    },
  },
};
</script>
