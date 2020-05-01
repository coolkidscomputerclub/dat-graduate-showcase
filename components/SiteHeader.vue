<template>
  <header class="site-header container">
    <nav class="nav">
      <ul>
        <li>
          <nuxt-link :to="studentsUrl()" title="See the graduates"
            >Students</nuxt-link
          >
        </li>

        <li>
          <nuxt-link to="/" title="Back to the homepage">Projects</nuxt-link>
        </li>
      </ul>
    </nav>

    <component :is="isHomepage ? 'h1' : 'p'" class="banner">
      <template v-if="isHomepage">
        <span class="dat">DAT’13</span>

        <span class="title">Graduate Showcase</span>
      </template>

      <nuxt-link v-else to="/">
        <span class="dat">DAT’13</span>

        <span class="title">Graduate Showcase</span>
      </nuxt-link>
    </component>
  </header>
</template>

<script>
import { studentsUrl } from '~/assets/js/urls';

export default {
  computed: {
    isHomepage() {
      return this.$route.path === '/';
    },
  },

  methods: {
    studentsUrl,
  },
};
</script>

<style scoped>
.site-header {
  margin: 0 auto;
  padding: 40px 32px;

  @media (--beta) {
    display: flex;
    align-items: center;
  }
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-family: var(--font-family-monospace);
  font-weight: 400;
  font-size: 20px;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;

  @media (--beta) {
    order: 1;
    justify-content: flex-start;
  }

  @media (--delta) {
    font-size: 24px;
  }

  & .dat {
    margin: 0 15px 0 0;
    padding: 12px 20px 14px;
    font-size: 32px;
    line-height: 1;
    color: var(--color-white);
    background-color: var(--color-black);

    @media (--alpha) {
      padding: 12px 18px 14px;
      font-size: inherit;
    }
  }

  & a {
    display: inherit;
    align-items: inherit;
    color: var(--color-black);
    border: none;

    &:hover {
      border: none;

      & .dat {
        background-color: var(--color-gold);
      }
    }
  }

  & .title {
    display: none;

    @media (--alpha) {
      display: initial;
    }
  }
}

.nav {
  margin: 0 0 40px 0;
  font-size: 16px;
  text-align: center;

  @media (--beta) {
    order: 2;
    margin: 0 0 0 auto;
  }

  & ul {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;

    & li {
      margin: 0 8px;

      @nest & + li {
        margin-left: 0;

        &::before {
          content: '|';
          display: inline-block;
          margin-right: 8px;
        }
      }

      @media (--alpha) {
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
