<template>
  <main id="main" class="main">
    <site-description />

    <div class="mt-10 border-solid border border-grey-light">
      <card-list class="container" :items="items" card="project-card" />
    </div>
  </main>
</template>

<script>
import CardList from '~/components/CardList.vue';
import SiteDescription from '~/components/SiteDescription.vue';
import { SITE_TITLE } from '~/assets/js/constants';
import trackPageview from '~/assets/js/analytics';
import { indexUrl } from '~/assets/js/urls';

let head;

if (process.server) {
  head = require('~/utilities/head').default;
}

export default {
  components: {
    CardList,
    SiteDescription,
  },

  async asyncData() {
    const { default: items } = await import('~/assets/data/index.json');

    return { items };
  },

  data() {
    return {
      items: [],
    };
  },

  head() {
    if (process.server) {
      return head(this.$route.path);
    }

    return {
      title: SITE_TITLE,

      link: [{ hid: 'canonical', rel: 'canonical', href: indexUrl(true) }],

      afterNavigation() {
        trackPageview();
      },
    };
  },
};
</script>
