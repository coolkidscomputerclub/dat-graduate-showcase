import cheerio from 'cheerio';
import { shuffle } from 'lodash';

const CLOUDINARY_AUTO_UPLOAD_URL =
  'https://res.cloudinary.com/coolkidscomputerclub/image/upload/f_auto,q_auto:best';
const IMAGE_URL_REGEXP = /(\/img\/[\w@-]+\.(?:jpg|png))/g;

const stripScriptsAndPreloads = html => {
  const $ = cheerio.load(html);

  $(
    ['link[rel="preload"][as="script"]', 'body script:not([data-hid])']
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

const replaceImageUrlsAndAddNoScriptFallbacks = html => {
  const $ = cheerio.load(html);
  const $imageEls = $('img');

  $imageEls.each(function() {
    const $imageEl = $(this);
    const isLazyloaded = $imageEl.hasClass('lazyload');
    const isImageSequence = $imageEl.hasClass('js-image-sequence');
    const src = $imageEl
      .attr('src')
      .replace(IMAGE_URL_REGEXP, `${CLOUDINARY_AUTO_UPLOAD_URL}$&`);
    const srcset = $imageEl
      .attr(isLazyloaded ? 'data-srcset' : 'srcset')
      .replace(IMAGE_URL_REGEXP, `${CLOUDINARY_AUTO_UPLOAD_URL}$&`);

    if (!isLazyloaded) {
      $imageEl.attr({ src, srcset });

      return;
    }

    $imageEl.attr({ src, 'data-srcset': srcset });

    if (isImageSequence) {
      return;
    }

    const $noScriptEl = $('<noscript />');
    const $fallbackImageEl = $imageEl.clone();

    $fallbackImageEl
      .attr({ srcset })
      .removeClass('lazyload')
      .removeAttr('data-srcset');

    $noScriptEl.append($fallbackImageEl);

    $imageEl.after($noScriptEl);
  });

  return $.html();
};

export default {
  generate: {
    page(page) {
      page.html = stripScriptsAndPreloads(page.html);
      page.html = replaceImageUrlsAndAddNoScriptFallbacks(page.html);
      // TODO: `<noscript />` for `<iframe>`s with class `.lazyload`
      // page.html = addNoScriptFallbackForLazyloadedIFrames(page.html);

      if (page.path === '/index.html' || page.path === '/students/index.html') {
        page.html = shuffleCardsInList(page.html);
      }
    },
  },
};
