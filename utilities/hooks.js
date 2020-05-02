import cheerio from 'cheerio';

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

export default {
  generate: {
    page(page) {
      page.html = stripScriptsAndPreloads(page.html);
    },
  },
};
