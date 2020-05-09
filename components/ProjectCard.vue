<template>
  <item-card
    class="project-card"
    :image="image"
    :url="projectUrlFromSlug(projectSlug)"
    :heading="studentName"
    :sub-heading="projectTitle"
  >
    <template #media>
      <image-sequence
        class="sprite"
        :sprite="sequenceImage"
        :frame-count="frameCount"
      />
    </template>
  </item-card>
</template>

<script>
import ImageSequence from '~/components/ImageSequence.vue';
import ItemCard from '~/components/ItemCard.vue';
import { projectUrlFromSlug } from '~/assets/js/urls';

export default {
  components: {
    ImageSequence,
    ItemCard,
  },

  props: {
    projectSlug: {
      type: String,

      required: true,
    },

    projectTitle: {
      type: String,

      required: true,
    },

    frameCount: {
      type: Number,

      required: true,
    },

    studentSlug: {
      type: String,

      required: true,
    },

    studentName: {
      type: String,

      required: true,
    },
  },

  computed: {
    image() {
      return {
        src: `/img/${this.projectSlug}.jpg`,
        srcset: `/img/${this.projectSlug}.jpg 1x, /img/${this.projectSlug}@2x.jpg 2x`,
        alt: `A photo of ${this.projectTitle} by ${this.studentName}`,
      };
    },

    sequenceImage() {
      return {
        src: `/img/${this.studentSlug}-sequence.jpg`,
        srcset: `/img/${this.studentSlug}-sequence.jpg 1x, /img/${this.studentSlug}-sequence@2x.jpg 2x`,
        alt: `An animated image of ${this.studentName} imitating their project ${this.projectTitle}`,
      };
    },
  },

  methods: {
    projectUrlFromSlug,
  },
};
</script>

<style>
.js .link:hover .sprite {
  visibility: visible;
}
</style>

<style scoped>
.sprite {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
