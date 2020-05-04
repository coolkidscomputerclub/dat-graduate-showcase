import cheerio from 'cheerio';
import { shuffle } from 'lodash';

const stripScriptsAndPreloads = html => {
  const $ = cheerio.load(html);

  $(
    [
      'link[rel="preload"][as="script"]',
      'body script[src^="/_nuxt/"]',
      'body script:not([src])',
    ]
      .filter(Boolean)
      .join(', '),
  ).remove();

  return $.html();
};

const shuffleCardsInList = html => {
  const $ = cheerio.load(html);
  const $listEl = $('.card-list');
  const $listItemEls = $(shuffle($listEl.children('li').get()));

  $listEl.html($listItemEls);

  return $.html();
};

export default {
  generate: {
    page(page) {
      page.html = stripScriptsAndPreloads(page.html);

      if (page.path === '/index.html' || page.path === '/students/index.html') {
        page.html = shuffleCardsInList(page.html);
      }
    },
  },
};
