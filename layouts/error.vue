<template>
  <div class="error container">
    <h1 class="title">{{ title }}</h1>

    <p><nuxt-link to="/">Back to the homepage</nuxt-link></p>
  </div>
</template>

<script>
import { SITE_TITLE } from '~/assets/js/constants';

export default {
  props: {
    error: {
      type: Object,

      required: true,
    },
  },

  computed: {
    title() {
      const { statusCode } = this.error;

      if (statusCode === 404) {
        return 'Page Not Found';
      }

      return 'An Error Occurred';
    },
  },

  head() {
    return {
      title: `${this.title} | ${SITE_TITLE}`,
    };
  },
};
</script>

<style scoped>
.error {
  padding: 0 30px 60px;
  text-align: center;

  @media (--beta) {
    text-align: left;
  }
}

.title {
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-regular);

  @media (--alpha) {
    font-size: var(--font-size-5);
  }

  @media (--beta) {
    font-size: var(--font-size-6);
  }
}
</style>
