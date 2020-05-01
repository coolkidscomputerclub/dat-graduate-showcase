<template>
  <item-card
    :image="image"
    :url="projectUrlFromSlug(projectSlug)"
    :heading="studentName"
    :sub-heading="projectTitle"
  />
</template>

<script>
import ItemCard from '~/components/ItemCard.vue';
import { projectUrlFromSlug } from '~/assets/js/urls';

export default {
  components: {
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
        src: `/img/${this.studentSlug}.jpg`,
        srcset: `/img/${this.studentSlug}.jpg 1x, /img/${this.studentSlug}@2x.jpg 2x`,
        alt: `A profile photo of ${this.studentName}`,
      };
    },
  },

  methods: {
    projectUrlFromSlug,
  },
};
</script>
