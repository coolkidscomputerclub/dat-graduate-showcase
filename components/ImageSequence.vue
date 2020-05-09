<template>
  <img
    ref="sprite"
    class="js-image-sequence lazyload"
    :src="sprite.src"
    :srcset="placeholder"
    :data-srcset="sprite.srcset"
    :alt="sprite.alt"
    :width="frameCount * 215"
    height="200"
    :data-frame-count="frameCount"
    data-frame-rate="12"
    data-frame-width="215"
    data-frame-height="215"
    data-wait-for-image="false"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  />
</template>

<script>
import Lemonade from '~/assets/js/lemonade';
import { TRANSPARENT_PNG as placeholder } from '~/assets/js/images';

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
  },

  data() {
    return {
      placeholder,
    };
  },

  mounted() {
    this.lemonade = new Lemonade(this.$refs.sprite);

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
