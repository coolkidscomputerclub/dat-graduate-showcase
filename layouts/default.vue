<template>
  <div class="l-default">
    <site-header />

    <nuxt />

    <site-footer />
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue';
import SiteFooter from '~/components/SiteFooter.vue';

export default {
  components: {
    SiteHeader,
    SiteFooter,
  },
};
</script>
