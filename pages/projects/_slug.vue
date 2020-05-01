<template>
  <main>
    <article>
      <figure class="featured-image">
        <img
          class="w-full h-full object-cover"
          :src="`/img/${project.slug}-featured.jpg`"
          :srcset="
            `/img/${project.slug}-featured.jpg 1x, /img/${project.slug}-featured@2x.jpg 2x`
          "
          :alt="`Featured image of ${project.title}`"
        />
      </figure>

      <div class="project container">
        <div class="details">
          <h1 class="heading">{{ project.title }}</h1>

          <p class="sub-heading">{{ student.name }}</p>
        </div>

        <div class="description" v-html="project.description" />

        <p v-if="project.links && project.links.website">
          <a :href="project.links.website" class="project-link"
            >{{ project.title }} Website</a
          >
        </p>

        <figure class="video">
          <iframe
            class="vimeo-player lazyload"
            :data-src="videoUrl"
            width="800"
            height="450"
            allowFullScreen
          />
        </figure>

        <div class="tags">
          <p class="tags-label">Tags:</p>

          <ul class="tag-list">
            <li v-for="tag in project.tags" :key="tag" class="tag-list-item">
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <div class="student py-10">
        <img
          class="student-image lazyload"
          :src="`/img/${student.slug}.jpg`"
          :srcset="`${placeholder} 1w`"
          :data-srcset="
            `/img/${student.slug}.jpg 1x, /img/${student.slug}@2x.jpg 2x`
          "
          sizes="150px"
          :alt="`A profile photo of ${student.name}`"
          width="150"
          height="150"
        />

        <p class="student-name">{{ student.name }}</p>

        <p class="course-name">{{ student.course }}</p>

        <ul v-if="student.links" class="link-list">
          <li v-if="student.links.website" class="link-list-item">
            <a :href="student.links.website">Portfolio</a>
          </li>

          <li v-if="student.links.twitter" class="link-list-item">
            <a :href="student.links.twitter">Twitter</a>
          </li>
        </ul>
      </div>
    </article>
  </main>
</template>

<script>
import { SITE_TITLE } from '~/assets/js/constants';
import trackPageview from '~/assets/js/analytics';
import { projectUrlFromSlug } from '~/assets/js/urls';
import projectSlugs from '~/assets/data/projects/validation.json';
import { TRANSPARENT_PNG as placeholder } from '~/assets/js/images';

let head;

if (process.server) {
  head = require('~/utilities/head').default;
}

export default {
  validate({ params: { slug } }) {
    return projectSlugs.includes(slug);
  },

  async asyncData({ params: { slug } }) {
    const { default: entry } = await import(
      `~/assets/data/projects/${slug}.json`
    );

    return entry;
  },

  data() {
    return {
      project: null,
      student: null,
      placeholder,
    };
  },

  computed: {
    videoUrl() {
      return `https://player.vimeo.com/video/${this.project.vimeoId}?title=0&byline=0&portrait=0&color=bf9d3e`;
    },
  },

  head() {
    if (process.server) {
      return head(this.$route.path, {
        title: this.project.title,
        slug: this.project.slug,
      });
    }

    return {
      title: `${this.project.title} | ${SITE_TITLE}`,

      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: projectUrlFromSlug(this.project.slug, true),
        },
      ],

      afterNavigation() {
        trackPageview();
      },
    };
  },
};
</script>

<style>
.description p {
  font-size: 18px;
  font-family: var(--font-family-serif);
  font-weight: 400;
  line-height: 1.6em;
}
</style>

<style scoped>
.featured-image {
  margin: 0 0 30px 0;
  height: 180px;
  background-color: var(--color-grey-light);
  overflow: hidden;

  @media (--alpha) {
    height: 290px;
  }

  @media (--beta) {
    height: 360px;
  }

  @media (--gamma) {
    height: 480px;
  }
}

.project {
  max-width: 700px;
  margin: 0 auto 60px;

  @media (--alpha) {
    width: 90%;
  }
}

.details {
  text-align: center;
  margin: 0 auto 60px auto;
}

.heading {
  font-size: 28px;
  display: inline-block;
  padding: 0 0 10px 0;
  border-bottom: 1px solid var(--color-black);
  text-transform: uppercase;
  font-family: var(--font-family-monospace);
  font-weight: 400;
  margin: 0.5em 0 0.9em 0;
  color: var(--color-black);
}

.sub-heading {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: var(--font-family-serif);
  font-weight: 400;
  line-height: 0.7em;
  color: var(--color-gold);
  margin: 0 0 30px 0;
}

.project-link {
  position: relative;
  margin-left: 24px;
  font-size: 18px;
  font-style: italic;

  &::before {
    content: '↳';
    position: absolute;
    right: 100%;
    top: 50%;
    margin-right: 8px;
    font-style: normal;
    transform: translateY(-50%);
  }
}

.video {
  position: relative;
  margin: 60px 0;
  padding-bottom: calc(9 / 16 * 100%);
}

.vimeo-player {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: var(--color-grey-light);
  border: 0;
  transform: translateX(-50%) translateY(-50%);
}

.tags {
  display: flex;
  align-items: baseline;
  margin: 0 0 60px;
}

.tags-label {
  margin: 0;
}

.tag-list {
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  margin: 0 0 0 4px;
  padding: 0;
  width: 90%;
  max-width: 700px;
  font-size: 18px;
  font-style: italic;
}

.tag-list-item {
  display: flex;
  color: var(--color-gold);
  font-size: 18px;
  font-style: italic;

  &::after {
    content: ' ,';
    padding: 0 4px 0 0;
    color: var(--color-black);
  }

  &:last-of-type {
    &::after {
      content: '.';
      color: var(--color-black);
    }
  }
}

.student {
  text-align: center;
  border-top: 1px solid var(--color-grey-light);
}

.about-student-inner {
  width: 90%;
  max-width: 700px;
  clear: both;
  margin: 0 auto;
  padding: 60px 0;
}

.student-details {
  font-family: var(--font-family-serif);
  text-align: center;
}

.student-name {
  margin: 0 0 10px 0;
  font-size: 18px;
  text-transform: uppercase;
  line-height: 12px;
  font-weight: 400;
  letter-spacing: 2px;
}

.course-name {
  margin: 0;
  font-style: italic;
  color: var(--color-gold);
}

.link-list {
  list-style-type: none;
  display: flex;
  justify-content: center;
  margin: 30px 0 0 0;
  padding: 0;
}

.link-list-item {
  @nest & + .link-list-item {
    margin-left: 16px;
  }
}

.student-image {
  display: block;
  margin: 0 auto 30px auto;
  padding: 7px;
  width: 150px;
  border: 1px solid var(--color-gold);
  border-radius: 50%;
}
</style>
