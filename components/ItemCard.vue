<template>
  <article class="card">
    <div class="media">
      <nuxt-link class="link" :to="url">
        <img
          class="image lazyload"
          :src="image.src"
          :srcset="`${placeholder} 1w`"
          :data-srcset="image.srcset"
          sizes="200px"
          :alt="image.alt"
          width="200"
          height="200"
        />

        <slot name="media" />
      </nuxt-link>

      <div class="border" />
    </div>

    <div class="details">
      <h3 class="heading">{{ heading }}</h3>

      <p class="sub-heading">{{ subHeading }}</p>
    </div>
  </article>
</template>

<script>
import { TRANSPARENT_PNG as placeholder } from '~/assets/js/images';

export default {
  props: {
    image: {
      type: Object,

      required: true,
    },

    url: {
      type: String,

      required: true,
    },

    heading: {
      type: String,

      required: true,
    },

    subHeading: {
      type: String,

      required: true,
    },
  },

  data() {
    return { placeholder };
  },
};
</script>

<style>
.link:hover .sprite {
  visibility: visible;
}
</style>

<style scoped>
.media {
  position: relative;
  padding: 15px;
}

.border {
  position: absolute;
  top: 0;
  left: 0;
  width: 230px;
  height: 230px;
  border: 1px solid var(--color-gold);
}

.link {
  position: relative;
  z-index: 1;
  display: block;
  width: 200px;
  height: 200px;
  border: none;
  overflow: hidden;

  &:hover {
    & ~ .border {
      border-color: var(--color-black);
    }
  }
}

.image {
  z-index: 1;
  background-color: var(--color-grey-light);
}

.details {
  position: relative;
  padding: 35px 15px;
  text-align: center;
  background-color: var(--color-white);
}

.heading {
  display: inline-block;
  margin: 0;
  padding: 0 0 10px 0;
  max-width: 200px;
  font-size: 18px;
  color: var(--color-grey-dark);
  text-transform: uppercase;
  font-family: var(--font-family-monospace);
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-bottom: 1px solid var(--color-grey-dark);
  overflow: hidden;
}

.sub-heading {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: var(--font-family-serif);
  font-weight: 400;
  color: var(--color-gold);
  margin: 10px 0 0 0;
}
</style>
