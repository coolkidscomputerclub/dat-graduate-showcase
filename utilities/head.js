import path from 'path';

import { contentType } from 'mime-types';

import { getOpenGraphImage } from '~/utilities/images';
import { SITE_DESCRIPTION, SITE_TITLE } from '~/assets/js/constants';
import {
  indexUrl,
  studentsUrl,
  projectUrlFromSlug,
  INDEX_PATH_REGEXP,
  STUDENTS_PATH_REGEXP,
  PROJECT_PATH_REGEXP,
} from '~/assets/js/urls';

const metaTag = ({ name, property, content }) => {
  const tag = {
    hid: name || property,
    content,
    once: true,
  };

  return {
    ...tag,
    ...(name ? { name } : {}),
    ...(property ? { property } : {}),
  };
};

const openGraphImageMeta = ({ url, width, height }) => {
  return [
    metaTag({
      property: 'og:image:url',
      content: url,
    }),

    metaTag({
      property: 'og:image:secure_url',
      content: url,
    }),

    metaTag({
      name: 'twitter:image',
      content: url,
    }),

    metaTag({
      property: 'og:image:type',
      content: contentType(path.extname(url)),
    }),

    width &&
      metaTag({
        property: 'og:image:width',
        content: width,
      }),

    height &&
      metaTag({
        property: 'og:image:height',
        content: height,
      }),
  ].filter(Boolean);
};

export const indexHead = () => {
  const title = SITE_TITLE;
  const description = SITE_DESCRIPTION;
  const url = indexUrl(true);

  return {
    title,

    link: [{ hid: 'canonical', rel: 'canonical', href: url }],

    meta: [
      metaTag({
        property: 'og:title',
        content: title,
      }),

      description &&
        metaTag({
          property: 'og:description',
          content: description,
        }),

      description &&
        metaTag({
          name: 'description',
          content: description,
        }),

      metaTag({
        property: 'og:url',
        content: url,
      }),

      metaTag({
        name: 'twitter:card',
        content: 'summary',
      }),
    ].filter(Boolean),
  };
};

export const studentsHead = () => {
  const title = `Students | ${SITE_TITLE}`;
  const description = SITE_DESCRIPTION;
  const url = studentsUrl(true);

  return {
    title,

    link: [{ hid: 'canonical', rel: 'canonical', href: url }],

    meta: [
      metaTag({
        property: 'og:title',
        content: title,
      }),

      description &&
        metaTag({
          property: 'og:description',
          content: description,
        }),

      description &&
        metaTag({
          name: 'description',
          content: description,
        }),

      metaTag({
        property: 'og:url',
        content: url,
      }),

      metaTag({
        name: 'twitter:card',
        content: 'summary',
      }),
    ].filter(Boolean),
  };
};

export const projectHead = ({ title, slug }) => {
  const pageTitle = `${title} | ${SITE_TITLE}`;
  const openGraphImage = getOpenGraphImage(slug);
  const url = projectUrlFromSlug(slug, true);

  return {
    title: pageTitle,

    link: [{ hid: 'canonical', rel: 'canonical', href: url }],

    meta: [
      metaTag({
        property: 'og:title',
        content: title,
      }),

      metaTag({
        property: 'og:url',
        content: url,
      }),

      metaTag({
        name: 'twitter:card',
        content: openGraphImage ? 'summary_large_image' : 'summary',
      }),

      ...(openGraphImage ? openGraphImageMeta(openGraphImage) : []),
    ].filter(Boolean),
  };
};

export default (path, data = {}) => {
  if (INDEX_PATH_REGEXP.test(path)) {
    return indexHead(data);
  }

  if (STUDENTS_PATH_REGEXP.test(path)) {
    return studentsHead(data);
  }

  if (PROJECT_PATH_REGEXP.test(path)) {
    return projectHead(data);
  }
};
