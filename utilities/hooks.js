import cheerio from 'cheerio';

const stripScriptsAndPreloads = html => {
  const $ = cheerio.load(html);

  $(
    ['link[rel="preload"][as="script"]', 'body script']
      .filter(Boolean)
      .join(', '),
  ).remove();

  return $.html();
};

export default {
  generate: {
    page(page) {
      if (page.path === '/404.html') {
        page.html = stripScriptsAndPreloads(page.html);
      }
    },
  },
};
